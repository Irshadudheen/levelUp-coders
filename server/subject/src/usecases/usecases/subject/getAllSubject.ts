import { Next } from "../../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../../interface/repositoryInterface/subjectRepository";

export const getAllSubject = async (subjectModels: IsubjectRepository,next:Next)=>{
    return await subjectModels.getSubject()
}