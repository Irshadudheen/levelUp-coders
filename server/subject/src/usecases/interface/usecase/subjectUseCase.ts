import { Isubject } from "../../../entities/subject";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IsubjectUseCase{
    addSubject(subject:Isubject,path:string,next:Next):Promise<Isubject|void>
    getSubject(productId:string,next:Next):Promise<Isubject|void>
    getAllSubject(next:Next):Promise<Isubject[]|void>
    editSubject(subject:Isubject,subjectId:string,next:Next):Promise<object|void>
    listCourse(subjectId:string,next:Next):Promise<Isubject|void>
}