import { Next } from "../../../framework/types/serverPakageTypes"
import { IlevelRepository } from "../../interface/repositoryInterface/levelRepository"

export const editLevel = async(level:object,levelRepository:IlevelRepository,next:Next)=>{
    try {
        return  await levelRepository.editLevel(level);
    } catch (error:any) {
        console.log(error.message)
    }
}