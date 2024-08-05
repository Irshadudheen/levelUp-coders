import { Isubject } from "../../../../../entities/subject";
import { IsubjectRepository } from "../../../../../usecases/interface/repositoryInterface/subjectRepository";
import subjectModel from "../../model/subject";
import {addSubject} from './subject/index'
export class SubjectRepositroy implements IsubjectRepository {
    constructor(private subjectModels:typeof subjectModel){}
  async  addSubject(subject: Isubject): Promise<Isubject> {
     return await addSubject(subject,this.subjectModels)
    }
    findByName(name: string): Promise<Isubject | void> {
        throw new Error("Method not implemented.");
    }
    blockSubject(id: string): Promise<object> {
        throw new Error("Method not implemented.");
    }
    getSubject(id: string): Promise<Isubject | void> {
        throw new Error("Method not implemented.");
    }
    editSubject(id: string): Promise<Isubject | void> {
        throw new Error("Method not implemented.");
    }
    
}