import { Iuser } from "../../../entities/user";
import { Next } from "../../../framework/types/serverPakageTypes";
import { Ijwt } from "../../interface/service/jwt";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import ErrorHandler from "../../middlewares/errorHandler";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IsentEmail } from "../../interface/service/sentEmail";
import { catchError } from "../../middlewares/catchError";
export const userSignup = async (jwt:Ijwt,otpRepository:IotpRepository,userRepository:IuserRepository,otpGenerate:IotpGenerate,hashPassword:IhashPassword,user:Iuser,sentEmail:IsentEmail,next:Next):Promise <string | void> =>{
    try {
        
        const userExist = await userRepository.findByEmail(user.email)
        if(userExist){
            return next(new ErrorHandler(400,'user already exist'))
        }
        const otp = await otpGenerate.createOtp()
        await otpRepository.createOtp(user.email,otp)
        await sentEmail.sentEmailVerification(user.name,user.email,otp)
        const hashPasswords = await hashPassword.createHash(user.password as string)
        user.password=hashPasswords
        const Token = await jwt.createVerificationJWT({name:user.name,email:user.email,password:user.password})
        return Token

    } catch (error) {
        catchError(error,next)
    }
}