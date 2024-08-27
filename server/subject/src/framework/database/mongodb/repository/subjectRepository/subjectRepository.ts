import { Isubject } from "../../../../../entities/subject";
import { IsubjectRepository } from "../../../../../usecases/interface/repositoryInterface/subjectRepository";
import subjectModel from "../../model/subject";
import {addSubject,findById,getSubject,editSubject} from './subject/index'
export class SubjectRepositroy implements IsubjectRepository {
    constructor(private subjectModels:typeof subjectModel){}
   async editSubject(subject: object): Promise<Isubject | void|object> {
        return await editSubject(subject,this.subjectModels)
    }
    // async findById(subjectId: string): Promise<Isubject> {
        
    //       return  await findById(subjectId,this.subjectModels)
    //    }
       async  findById(subjectId: string): Promise<Isubject|void> {
        try {
            return await findById(subjectId,this.subjectModels)
            
        } catch (error:any) {
            console.log(error.message)
        }
       }
    //    async findAllSubject
  async  addSubject(subject: Isubject): Promise<Isubject> {
     return await addSubject(subject,this.subjectModels)
    }
   
    blockSubject(id: string): Promise<object> {
        throw new Error("Method not implemented.");
    }
   async getSubject(): Promise<Isubject[]|void > {
   
        return await getSubject(this.subjectModels)
        
    }
  
}