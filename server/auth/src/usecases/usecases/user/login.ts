import { Next } from "../../../framework/types/serverPakageTypes";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { Ijwt } from "../../interface/service/jwt";
import ErrorHandler from "../../middlewares/errorHandler";


export const login =async (userRepository:IuserRepository,jwt:Ijwt,hashPassword:IhashPassword,email:string,password:string,next:Next):Promise<object|void>=>{
try {
    const user = await userRepository.findByEmail(email);
    console.log('the checked',user)
    if(!user) return next(new ErrorHandler(400,'invalid email id'))
        if(user?.blocked){
            return next(new ErrorHandler(400,'acces is denied by admin'))
        }
        const comparePassword = await hashPassword.compareHashPassword(password,user.password)
        if(!comparePassword) return next(new ErrorHandler(400,'password incorrect'))
            const token:any = await jwt.createAccessAndRefreashToken(user._id as string)
        token.role='user'
        return {user,token}
} catch (error) {
    throw error
}
}