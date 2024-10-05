import { Next } from "../../../framework/types/serverPakageTypes"
import { IsubjectRepository } from "../../interface/repositoryInterface/subjectRepository"

export const listCourse=async(subjectId:string,subjectRepository:IsubjectRepository,next:Next)=>{
    try {
        return await subjectRepository.blockSubject(subjectId)
    } catch (error:any) {
        throw error
        
    }
}