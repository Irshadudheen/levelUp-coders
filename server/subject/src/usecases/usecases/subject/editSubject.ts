import { Next } from "../../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../../interface/repositoryInterface/subjectRepository";

export const editSubject = async(subject:object,subjectRepository:IsubjectRepository,next:Next)=>{
    try {
        return await subjectRepository.editSubject(subject)
    } catch (error:any) {
        console.log(error.message)
    }
}