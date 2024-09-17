
import { IuserUseCase } from "../interface/usecase/userUseCase";
import { Iuser } from "../../entities/user";
import {createUser} from './user/index'

import { IuserRepository } from "../interface/repositoryInterface/userRepository";




export class UserUseCase implements IuserUseCase{
    constructor(
        private userRepository:IuserRepository,
      

    ) {}

   
    async createUser(user:Iuser) : Promise <Iuser| void>{
        try {
            const userData = await createUser(user,this.userRepository)
            console.log("in the usecase", userData)
            return userData
       } catch (error:any) {
        console.log(error.message) 

            
       }
    }
   
    
   
    
  
}   