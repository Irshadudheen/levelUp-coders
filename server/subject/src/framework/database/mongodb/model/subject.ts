import { Isubject } from "../../../../entities/subject";
import { Model, model, Schema } from "mongoose";
const subjectSchema :Schema<Isubject> = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    is_blocked:{type:Boolean,default:false},
    level:[]
})
const subjectModel:Model<Isubject>=model('subject',subjectSchema);
export default subjectModel