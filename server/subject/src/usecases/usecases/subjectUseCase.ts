import { Isubject } from "../../entities/subject";
import { Next } from "../../framework/types/serverPakageTypes";
import { IsubjectRepository } from "../interface/repositoryInterface/subjectRepository";
import { IsubjectUseCase } from "../interface/subjectUseCase";
import { addSubject } from "./subject/index";
export class SubjectUseCase implements IsubjectUseCase{
    constructor(
        private subjectRepository:IsubjectRepository,

        
    ){}
    async addSubject(subject: Isubject, next: Next): Promise<Isubject | void> {
        return await addSubject(subject,this.subjectRepository,next)
    }
}