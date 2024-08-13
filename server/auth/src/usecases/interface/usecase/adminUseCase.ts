import { Iadmin } from "../../../entities/admin";
import { Iuser } from "../../../entities/user";
import { Next } from "../../../framework/types/serverPakageTypes";
import { IToken } from "../service/jwt";

export interface IadminUseCase{
    adminLogin(email:string,passsword:string,next:Next):Promise <object|void>
    getUserData(next:Next):Promise <Iuser[]|void>
    blockUser(userId:string,next:Next):Promise<Iuser|void>
}