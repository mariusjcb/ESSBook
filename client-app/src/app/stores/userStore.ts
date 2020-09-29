import { action, computed, configure, observable, runInAction } from "mobx";
import { UserApi } from "../api/userApi";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";
import { history } from '../../index';

configure({ enforceActions: "always" });

export default class UserStore {
    rootStore: RootStore;
    
    @observable user: IUser | null = null;
    @observable submitting = false;

    @computed get isLoggedIn() { return !!this.user }

    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }

    @action getUser = async () => {
        try {
            const user = await UserApi.user();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action login = async (values: IUserFormValues) => {
        runInAction(() => { this.submitting = true });
        try {
            const user = await UserApi.login(values);
            runInAction(() => {
                this.user = user;
                this.submitting = false;
            });
            console.log(user);
            this.rootStore.commonStore.setToken(user.token);
            history.push("/activities");
        } catch (error) {
            console.log(error);
            runInAction(() => { this.submitting = false });
        }
    }
    
    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push("/login");
    };
}