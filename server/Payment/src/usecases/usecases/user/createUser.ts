import { Iuser } from "../../../entities/user"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"
import ErrorHandler from "../../middlewares/errorHandler"



export const createUser= async (user:Iuser,userRepository:IuserRepository):Promise <Iuser | void>=>{  
     
    try{
        console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaai")
        
        const newUser = await userRepository.createUser(user)
        console.log("createding user",newUser)
        return newUser
    
    
    }catch(error){
        throw error
    }
      
}