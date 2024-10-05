import { Isubject } from "../../entities/subject";
import { Icloudinary } from "../../framework/service/cloudinary";
import { Next } from "../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../interface/repositoryInterface/subjectRepository";
import { IsubjectUseCase } from "../interface/usecase/subjectUseCase";
import { addSubject,findSubject ,getAllSubject,editSubject,listCourse} from "./subject/index";
export class SubjectUseCase implements IsubjectUseCase{
    constructor(
        private subjectRepository:IsubjectRepository,
        private cloudinary:Icloudinary,

        
    ){}
    async listCourse(subjectId: string, next: Next): Promise<Isubject | void> {
       return await listCourse(subjectId,this.subjectRepository,next)
    }
    async editSubject(subject: Isubject,subjectId:string, next: Next): Promise<object | void> {
        return await editSubject(subject,subjectId,this.subjectRepository,next)
    }
   async getSubject(productId: string, next: Next): Promise<Isubject | void> {
        return await findSubject(this.subjectRepository,productId,next)
    }
    async addSubject(subject: Isubject,path:string ,next: Next): Promise<Isubject | void> {
        return await addSubject(subject,this.subjectRepository,this.cloudinary,path,next)
    }
    async getAllSubject(next:Next):Promise<Isubject[]|void>{
        return await getAllSubject(this.subjectRepository,next)
    }
}