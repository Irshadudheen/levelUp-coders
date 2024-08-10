import { Next } from "../../../framework/types/serverPakageTypes";
import { IlevelRepository } from "../../interface/repositoryInterface/levelRepository";

export const getLevel = async (subjectId:string,levelRepository:IlevelRepository,next:Next)=>{
    try {
        return await levelRepository.getLevel(subjectId)
    } catch (error) {
        
    }
}