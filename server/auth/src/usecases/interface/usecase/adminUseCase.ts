import { Iadmin } from "../../../entities/admin";
import { Next } from "../../../framework/types/serverPakageTypes";
import { IToken } from "../service/jwt";

export interface IadminUseCase{
    adminLogin(email:string,passsword:string,next:Next):Promise <object|void>
}