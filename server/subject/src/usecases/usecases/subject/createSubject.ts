import { Isubject } from "../../../entities/subject";
import  { Icloudinary } from "../../../framework/service/cloudinary";
import { Next } from "../../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../../interface/repositoryInterface/subjectRepository";

export const addSubject = async (subject:Isubject,subjectRepository:IsubjectRepository,cloudinary:Icloudinary,path:string,next:Next):Promise<Isubject|void>=>{
    try {
        // const subjectExist = await subjectRepository.findByName(subject.name);
        // if(subjectExist){
        //     // return next(new ErrorHandler(400,'subject already exists'))
        // }
        const result= await cloudinary.v2.uploader.upload(path)
       subject.image=result.secure_url
        return await subjectRepository.addSubject(subject)
    } catch (error) {
        // catchError(error,next)
    }
}