import { ApiWorker } from './agent'
import { IUser, IUserFormValues } from '../models/user';

class UserApiWorker extends ApiWorker {
    public requests = {
        user: (): Promise<IUser> => this.request.get("/user"),
        login: (user: IUserFormValues): Promise<IUser> => this.request.post(`/user/login`, user),
        register: (user: IUserFormValues): Promise<IUser> => this.request.post("/user/register", user)
    };
}

export const UserApi = new UserApiWorker().requests;