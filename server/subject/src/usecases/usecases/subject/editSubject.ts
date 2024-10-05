import { Isubject } from "../../../entities/subject";
import { Next } from "../../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../../interface/repositoryInterface/subjectRepository";

export const editSubject = async(subject:Isubject,subjectId:string,subjectRepository:IsubjectRepository,next:Next)=>{
    try {
        return await subjectRepository.editSubject(subjectId,subject)
    } catch (error:any) {
        console.log(error.message)
    }
}