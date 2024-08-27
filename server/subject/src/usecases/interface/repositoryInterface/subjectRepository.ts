import { Isubject } from "../../../entities/subject";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IsubjectRepository{
    addSubject(subject:Isubject):Promise <Isubject>
    findById(subjectId:string):Promise <Isubject|void>
    blockSubject(id:string):Promise<object>
    getSubject():Promise<Isubject[]|void>
    editSubject(subject:object):Promise<object|void>
}