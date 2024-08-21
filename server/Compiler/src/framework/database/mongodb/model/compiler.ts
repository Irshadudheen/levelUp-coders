import mongoose, { model, Model, Schema } from "mongoose";
import { Icompiler } from "../../../../entities/compiler";

const CompilerSchema:Schema<Icompiler>= new Schema({
    question_title:{type:String,required:true},
    question_description:{type:String,required:true},
    input_format:{type:String,required:true},
    output_format:{type:String,required:true},
    sample_input:{type:String,required:true},
    sample_output:{type:String,required:true},
    difficulty_level:{type:String,required:true,enum:['easy','medium','hard'],default:'easy'},
    levelId:{type:Schema.ObjectId,required:true}
})

const compilerModel:Model<Icompiler>=model('compiler',CompilerSchema)
export default compilerModel
