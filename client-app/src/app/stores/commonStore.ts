import { action, observable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore

        reaction(
            () => this.token,
            token => {
                console.log(token);
                if (token) {
                    window.localStorage.setItem('access_token', token!);
                } else {
                    window.localStorage.removeItem('access_token');
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem('access_token');
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        this.token = token
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}