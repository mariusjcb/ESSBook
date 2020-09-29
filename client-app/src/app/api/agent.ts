import axios, { AxiosResponse } from "axios";

export interface IAxiosRequest {
    get: (url: string) => Promise<any>;
    post: (url: string, body: {}) => Promise<any>;
    put: (url: string, body: {}) => Promise<any>;
    del: (url: string) => Promise<any>;
}

export class ApiWorker {
    protected get version(): string { return "" }
    protected get baseUrl(): string { return "" }
    private get debugSleepDelay(): number { return 0 }

    protected get request(): IAxiosRequest { return this.requestBase }
    private responseMiddleware?: (response: AxiosResponse<any>) => any;

    public constructor(
        onResponseMiddleware?: (response: AxiosResponse<any>) => any,
        onSuccess?: ((value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>) | undefined,
        onError?: ((error: any) => any) | undefined
    ) {
        this.responseMiddleware = onResponseMiddleware;
        axios.defaults.baseURL = this.baseUrl.replace("{apiVersion}", this.version);
        axios.interceptors.response.use(onSuccess, onError);
    }

    private sleepDebugPromise = (ms: number = this.debugSleepDelay) => (r: AxiosResponse) =>
        new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(r), ms));

    private requestBase: IAxiosRequest = {
        get: (url: string) => axios.get(url).then(this.sleepDebugPromise()).then(this.responseMiddleware),
        del: (url: string) => axios.delete(url).then(this.sleepDebugPromise()).then(this.responseMiddleware),
        post: (url: string, body: {}) =>
        axios
            .post(url, body)
            .then(this.sleepDebugPromise())
            .then(this.responseMiddleware),
        put: (url: string, body: {}) =>
        axios
            .put(url, body)
            .then(this.sleepDebugPromise())
            .then(this.responseMiddleware)
    };
}

