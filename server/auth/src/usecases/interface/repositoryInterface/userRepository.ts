import { Iuser } from "../../../entities/user";

export interface IuserRepository{
    createUser(newUser:Iuser) : Promise <Iuser>
    findByEmail(email:string) : Promise <Iuser | void>
    singup(email:string):Promise <string>

    blockUser(id:string):Promise<any>
    getUser(id:string):Promise<Iuser|undefined>
    changePassword(password:string,email:string):Promise<void>
}