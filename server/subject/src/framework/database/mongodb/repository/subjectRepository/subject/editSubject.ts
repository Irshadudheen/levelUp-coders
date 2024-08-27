import { Isubject } from "../../../../../../entities/subject";
import subjectModel from "../../../model/subject";

export const editSubject = async (subject:any,subjectModels:typeof subjectModel)=>{
    try {
        const course = await subjectModels.findOne({_id:subject.subjectId})
        if(!course) return {status:404,message:"Course not found"};
        course.name=subject.name||course.name;
        course.description=subject.description||course.description;
        course.image=subject.image||course.image
        await course.save();
        return course
    } catch (error:any) {
        console.log(error.message);
        
    }
}