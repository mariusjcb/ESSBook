import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const DefaultResponseMiddleware = (r: AxiosResponse) => r.data;

export const DefaultSuccessHandler = undefined;

export const DefaultErrorHandler = (e: any) => {
    const { status, data } = e.response;
    if (!data.errors) {
        switch (status) {
            case 401: toast.error("Access was denied. Try again."); break;
            case 404: toast.error("Content not found"); break;
            case 409: toast.error("Already exists!"); break;
            case 403: toast.error("You can't change this resource. It's not yours. ;)"); break;
            case (status > 500 && status < 599): toast.error("Internal Server Error. Try again later."); break;
            default: break;
        }
    } else {
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
    }
    throw e;
};