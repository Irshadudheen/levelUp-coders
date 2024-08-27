import { Model, model, Schema } from "mongoose";
import { Icategory } from "../../../../entities/category";
const categorySchema :Schema<Icategory> = new Schema({
    name:{type:String,required:true},
    block:{type:Boolean,default:false,required:true},
    description:{type:String}
    
    
})
const categoryModel:Model<Icategory>=model('category',categorySchema);
export default categoryModel