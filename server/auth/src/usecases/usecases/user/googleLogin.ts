import { Next } from "../../../framework/types/serverPakageTypes";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { Ijwt } from "../../interface/service/jwt";

export const googleLogin = async (userRepository:IuserRepository,hashPassword:IhashPassword,jwt:Ijwt,name:string,email:string,password:string,next:Next):Promise <object|void>=>{
    try {
        const user = await userRepository.findByEmail(email);
        if (!user){
            const user= await userRepository.createUser({name,email,password})
            const token = jwt.createAccessAndRefreashToken(user._id as string)
            return {user,token}
        }
        const token = jwt.createAccessAndRefreashToken(user._id as string)
        return {user,token}
    } catch (error) {
        
    }
}