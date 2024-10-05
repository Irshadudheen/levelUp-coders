import { Isubject } from "../../../../../entities/subject";
import { IsubjectRepository } from "../../../../../usecases/interface/repositoryInterface/subjectRepository";
import subjectModel from "../../model/subject";
import { addSubject, findById, getSubject, editSubject } from './subject/index'
export class SubjectRepositroy implements IsubjectRepository {
    constructor(private subjectModels: typeof subjectModel) { }
    async editSubject(subjectId: string, subject: Isubject): Promise<Isubject | void | object> {
        return await editSubject(subjectId, subject, this.subjectModels)
    }
    // async findById(subjectId: string): Promise<Isubject> {

    //       return  await findById(subjectId,this.subjectModels)
    //    }
    async findById(subjectId: string): Promise<Isubject | void> {
        try {
            return await findById(subjectId, this.subjectModels)

        } catch (error: any) {
            console.log(error.message)
        }
    }
    
    async addSubject(subject: Isubject): Promise<Isubject> {
        return await addSubject(subject, this.subjectModels)
    }

    async blockSubject(id: string): Promise<Isubject> {
        try {
            const subject = await this.subjectModels.findById(id);
            
            if (!subject) {
                throw new Error(`Subject with id ${id} not found.`);
            }

            subject.is_blocked = !subject.is_blocked;
            return await subject.save();
        } catch (error) {
            // Handle or rethrow the error as needed
            throw new Error(`Failed to block subject: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getSubject(): Promise<Isubject[] | void> {

        return await getSubject(this.subjectModels)

    }

}