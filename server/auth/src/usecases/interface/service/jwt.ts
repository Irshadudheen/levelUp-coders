import { Iuser } from "../../../entities/user";
import { Req } from "../../../framework/types/serverPakageTypes";
import Jwt from 'jsonwebtoken'
export interface IToken {
    accessToken:string,
    refreashToken:string,
    role:string
}

export interface Ijwt {
    createVerificationJWT(payload:Iuser): Promise <string>
    createAccessAndRefreashToken(id:string): Promise <object>
    verifyJwt(token:string): Promise <Object>
    forgetPasswordToken(userId:string,email:string): Promise <string>
}