import { Next } from "../../../framework/types/serverPakageTypes";
import {Iuser} from '../../../entities/user'
import { IToken } from "../service/jwt";
export interface IuserUseCase{
    userSignup(user:Iuser,next:Next):Promise <string |void >
    createUser(email:string , otp:string, next: Next) : Promise <Iuser| void>
    login(email:string,password:string,next:Next):Promise <{user:Iuser,token:IToken} |void>
    forgotPasswordRemainder(email:string,next:Next):Promise <object|void>
    emailVerify(email:string,otp:string,next:Next) :Promise <object|void>
    updatePassword(email:string,passsword:string,next:Next):Promise <object|void>
    googleLogin(name:string,email:string,passsword:string,next:Next):Promise<object|void>
}