import { Iuser } from "../../../entities/user"
import { Next } from "../../../framework/types/serverPakageTypes"
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"
import { IhashPassword } from "../../interface/service/hashPassword"
import { Ijwt } from "../../interface/service/jwt"
import { catchError } from "../../middlewares/catchError"
import ErrorHandler from "../../middlewares/errorHandler"



export const createUser= async (token:string,otp:string,otpRepository:IotpRepository,userRepository:IuserRepository,hashPassword:IhashPassword,jwt:Ijwt,next : Next):Promise <Iuser | void>=>{  
     
    try{
        console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaai")
        const decode = await jwt.verifyJwt(token) as Iuser
        console.log(decode,"hai how are you")
         console.log(" the decoded  jwt",decode)
        if(!decode){
            return next(new ErrorHandler(400,"token has expired,register again"))
        }
         
        const result = await otpRepository.findOtp(decode.email)
          console.log("the result of the otp",result)
        if(!result){
            return next(new ErrorHandler(400,"otp expired"))
        }
      
        if(result.otp !== otp.replace(/,/g, '')){
           return next(new ErrorHandler(400,"invalid otp"))
        }
         
        const newUser = await userRepository.createUser(decode)
        console.log("createding user",newUser)
        return newUser
    
    
    }catch(error){
        throw error
    }
      
}