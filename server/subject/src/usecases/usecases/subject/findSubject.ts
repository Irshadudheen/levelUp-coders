import { Next } from "../../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../../interface/repositoryInterface/subjectRepository";

export const findSubject =async (subjectRepository:IsubjectRepository,subjectId:string,next:Next)=>{
try {
    return await subjectRepository.findById(subjectId)
} catch (error:any) {
    
}
} 