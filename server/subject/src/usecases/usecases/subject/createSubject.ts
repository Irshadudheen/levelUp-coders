import { Isubject } from "../../../entities/subject";
import { Next } from "../../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../../interface/repositoryInterface/subjectRepository";

export const addSubject = async (subject:Isubject,subjectRepository:IsubjectRepository,next:Next):Promise<Isubject|void>=>{
    try {
        // const subjectExist = await subjectRepository.findByName(subject.name);
        // if(subjectExist){
        //     // return next(new ErrorHandler(400,'subject already exists'))
        // }
        return await subjectRepository.addSubject(subject)
    } catch (error) {
        // catchError(error,next)
    }
}