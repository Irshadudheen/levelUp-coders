import { Next } from "../../../framework/types/serverPakageTypes";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { Ijwt } from "../../interface/service/jwt";
import ErrorHandler from "../../middlewares/errorHandler";

export const googleLogin = async (userRepository:IuserRepository,hashPassword:IhashPassword,jwt:Ijwt,name:string,email:string,password:string,next:Next):Promise <object|void>=>{
    try {
        const user = await userRepository.findByEmail(email);
        if (!user){
            const user= await userRepository.createUser({name,email,password})
            console.log(user,'google login user ',user.blocked)
            if(user.blocked) return next(new ErrorHandler(400,'admin blocked the user'))
            const token:any = await jwt.createAccessAndRefreashToken(user._id as string)
                token.role='user'
                console.log(token,"the token is checking in user use case index in")
            return {user,token}
        }
        if(user.blocked) return next(new ErrorHandler(400,'admin blocked the user'))
        const token:any =await jwt.createAccessAndRefreashToken(user._id as string)
    console.log(token,"the google token place")
    token.role='user'
        return {user,token}
    } catch (error) {
        
    }
}