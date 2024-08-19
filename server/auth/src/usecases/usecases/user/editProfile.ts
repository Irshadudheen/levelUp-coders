import { Next } from "../../../framework/types/serverPakageTypes";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";

export  const editProfile=async(name:string,userId:string,userRepository:IuserRepository,next:Next)=>{
    try {
        return userRepository.updateProfile(name,userId)
    } catch (error) {
        throw error
    }
}