import { model, Model, Schema } from "mongoose";
import { Iquiz } from "../../../../entities/quiz";
const quizSchema :Schema<Iquiz>= new Schema({
    questoinTitle:{type:String,required:true},
    question:{type:String,required:true},
    options:{type:Object,required:true},
    levelId:{type:Schema.ObjectId,required:true, ref:"level"}
})
const quizModel:Model<Iquiz>=model('quiz',quizSchema);
export default quizModel