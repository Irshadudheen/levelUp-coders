import { Ilevel } from "../../../../entities/level";
import { Model, model, Schema } from "mongoose";
const levelSchema :Schema<Ilevel> = new Schema({
    name:{type:String,required:true},
   
    image:{type:String,required:true},
    premium:{type:Boolean,required:true},
 
    subjectId:{type:Schema.Types.ObjectId,required:true,ref:'subject'}
})
const levelModel:Model<Ilevel>=model('level',levelSchema);
export default levelModel