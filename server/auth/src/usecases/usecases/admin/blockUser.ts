import { Next } from "../../../framework/types/serverPakageTypes";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";

export const blockUser= async(userId:string,userRepository:IuserRepository,next:Next)=>{
    try {
        return await userRepository.blockUser(userId)
    } catch (error) {
        throw error
    }
}