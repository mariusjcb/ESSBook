import { ApiWorker } from './agent'
import { IActivity } from "../models/activity";

class ActivitiesApiWorker extends ApiWorker {
    public requests = {
        list: (): Promise<IActivity[]> => this.request.get("/activities"),
        details: (id: string): Promise<IActivity> => this.request.get(`/activities/${id}`),
        create: (activity: IActivity): Promise<void> => this.request.post("/activities", activity),
        update: (activity: IActivity): Promise<void> => this.request.put(`/activities/${activity.id}`, activity),
        delete: (id: string) => this.request.del(`/activities/${id}`),
    };
}

export const ActivitiesApi = new ActivitiesApiWorker().requests;