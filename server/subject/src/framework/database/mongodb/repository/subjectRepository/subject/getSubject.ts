import { Isubject } from "../../../../../../entities/subject";
import subjectModel from "../../../model/subject";

export const getSubject = async (subjectModels:typeof subjectModel): Promise<Isubject[]>=>{
    try {
        return await subjectModels.find().populate('categoryId')
      
    } catch (error) {
        throw error
    }
}