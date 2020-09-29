import axios, { AxiosResponse } from "axios";
import { DefaultErrorHandler, DefaultResponseMiddleware, DefaultSuccessHandler } from './handlers/DefaultApiHandlers';

export interface IAxiosRequest {
    get: (url: string) => Promise<any>;
    post: (url: string, body: {}) => Promise<any>;
    put: (url: string, body: {}) => Promise<any>;
    del: (url: string) => Promise<any>;
}

export class ApiWorker {
    protected get version(): string { return "1" }
    protected get baseUrl(): string { return "http://localhost:5000/api/v{apiVersion}" }
    private get debugSleepDelay(): number { return 0 }

    protected get request(): IAxiosRequest { return this.requestBase }
    private responseMiddleware?: (response: AxiosResponse<any>) => any;

    public constructor(
        onResponseMiddleware: (response: AxiosResponse<any>) => any = DefaultResponseMiddleware,
        onSuccess: ((value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>) | undefined = DefaultSuccessHandler,
        onError: ((error: any) => any) | undefined = DefaultErrorHandler
    ) {
        this.responseMiddleware = onResponseMiddleware;
        this.setupAxiosJWTAdapter();
        axios.defaults.baseURL = this.baseUrl.replace("{apiVersion}", this.version);
        axios.interceptors.response.use(onSuccess, onError);
    }

    private setupAxiosJWTAdapter() {
        axios.interceptors.request.use((config) => {
            const token = window.localStorage.getItem('access_token');
            if (token) config.headers.Authorization = `Bearer ${token}`;
                return config;
        }, error => {
            return Promise.reject(error);
        })
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

