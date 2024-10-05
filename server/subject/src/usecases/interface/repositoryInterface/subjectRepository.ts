import { Isubject } from "../../../entities/subject";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IsubjectRepository{
    addSubject(subject:Isubject):Promise <Isubject>
    findById(subjectId:string):Promise <Isubject|void>
    blockSubject(id:string):Promise<Isubject>
    getSubject():Promise<Isubject[]|void>
    editSubject(subjectId:string,subject:Isubject):Promise<object|void>
}