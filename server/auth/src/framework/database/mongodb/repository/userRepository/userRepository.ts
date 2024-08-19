import { Iuser } from "../../../../../entities/user";
import { IuserRepository } from "../../../../../usecases/interface/repositoryInterface/userRepository";
import userModel from "../../model/userModel";
import { block, createUser, editProfile, findbyEmail, getAllUser, getUser ,updateUserPassword} from './user/index';

export class UserRepository implements IuserRepository {
    constructor(private userModels: typeof userModel) {}
    async updateProfile(name: string, userId: string): Promise<Iuser | void|null> {
        return await editProfile(name,userId,this.userModels)
    }

  async  blockUser(id: string): Promise<Iuser|void> {
      return await block(id,this.userModels)
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

   async getAllUser():Promise<Iuser[]|void>{
    return await getAllUser(this.userModels)
   }

    async getUser(id: string): Promise<Iuser | undefined> {
        return await getUser(this.userModels, id);
    }

  

    async changePassword(email: string, passsword: string): Promise<void> {
      const data=  await updateUserPassword(this.userModels,email,passsword)
    console.log(data)
    }
}
