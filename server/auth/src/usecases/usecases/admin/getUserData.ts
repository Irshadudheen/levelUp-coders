
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";

export const getUserData = async(userRepository:IuserRepository)=>{
    try {
        return await userRepository.getAllUser()
    } catch (error) {
        throw error
    }
}