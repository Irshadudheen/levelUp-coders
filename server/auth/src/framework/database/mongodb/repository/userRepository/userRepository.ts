import { Iuser } from "../../../../../entities/user";
import { IuserRepository } from "../../../../../usecases/interface/repositoryInterface/userRepository";
import userModel from "../../model/userModel";
import { createUser, editUserData, findbyEmail, getUser ,updateUserPassword} from './user/index';

export class UserRepository implements IuserRepository {
    constructor(private userModels: typeof userModel) {}

    blockUser(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async createUser(newUser: Iuser): Promise<Iuser> {
        return await createUser(newUser, this.userModels);
    }

    async findByEmail(email: string): Promise<void | Iuser> {
        return await findbyEmail(this.userModels, email);
    }

    async singup(email: string): Promise<string> {
        return "jiii";
    }

   

    async getUser(id: string): Promise<Iuser | undefined> {
        return await getUser(this.userModels, id);
    }

    async editUserData(id: string, phoneNumber: string, name: string): Promise<Iuser | undefined> {
        return await editUserData(this.userModels, id, phoneNumber, name);
    }

    async changePassword(email: string, passsword: string): Promise<void> {
      const data=  await updateUserPassword(this.userModels,email,passsword)
    console.log(data)
    }
}
