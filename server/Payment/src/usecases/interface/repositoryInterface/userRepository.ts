import { Iuser } from "../../../entities/user";

export interface IuserRepository{
    createUser(newUser:Iuser) : Promise <Iuser>
    findByEmail(email:string) : Promise <Iuser | void>
   
    getAllUser():Promise<Iuser[]|void>
    blockUser(id:string):Promise<Iuser|void>
    getUser(id:string):Promise<Iuser|undefined>
    changePassword(password:string,email:string):Promise<void>
    updateProfile(name:string,userId:string):Promise<Iuser|void|null>
}