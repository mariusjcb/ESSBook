import { ApiWorker } from './agent'
import { toast } from "react-toastify";
import { IActivity } from "../models/activity";

class ActivitiesApiWorker extends ApiWorker {
    protected get version(): string { return "v1.0" }
    protected get baseUrl(): string { return "http://localhost:5000/api/{apiVersion}" }

    public requests = {
        list: (): Promise<IActivity[]> => this.request.get("/activities"),
        details: (id: string): Promise<IActivity> => this.request.get(`/activities/${id}`),
        create: (activity: IActivity): Promise<void> => this.request.post("/activities", activity),
        update: (activity: IActivity): Promise<void> => this.request.put(`/activities/${activity.id}`, activity),
        delete: (id: string) => this.request.del(`/activities/${id}`),
    };
}

export const ActivitiesApi = new ActivitiesApiWorker(
    (r) => r.data, undefined, 
    (e) => {
        const { data } = e.response;
        var messages: string[] = [];
        document
            .querySelectorAll('input')
            .forEach(n => n.classList.remove("invalid"));
        for(var key in data.errors) {
            messages.push("- " + data.errors[key].toString());
            document
                .querySelectorAll('[name="' + key.toLowerCase() + '"]')
                .forEach(n => n.classList.add("invalid"));
        }
        toast.error("Error requesting server.\n" + messages.join("\n"));
        throw e;
    }).requests;