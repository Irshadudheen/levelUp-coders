import { Isubject } from "../../../../../../entities/subject";
import subjectModel from "../../../model/subject";

export const addSubject = async (newSubject:Isubject,subjectModels:typeof subjectModel) : Promise<Isubject>=>{
try {
    const subject = await subjectModels.create(newSubject)
    return subject
} catch (error) {
    throw error
}

}