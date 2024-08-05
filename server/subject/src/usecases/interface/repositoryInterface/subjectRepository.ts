import { Isubject } from "../../../entities/subject";

export interface IsubjectRepository{
    addSubject(subject:Isubject):Promise <Isubject>
    findByName(name:string):Promise <Isubject|void>
    blockSubject(id:string):Promise<object>
    getSubject(id:string):Promise<Isubject|void>
    editSubject(id:string):Promise<Isubject|void>
}