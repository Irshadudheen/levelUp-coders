import mongoose, { Model, Schema } from "mongoose";

import { Iactive } from "../../../../entities/activeDays";

const AdminSchema :Schema <Iactive>= new mongoose.Schema({
    userId:{type:Schema.ObjectId, ref:'user'},
    days:[{date:{type:Date,required:true},isActive:{type:Boolean,required:true}}]
    
})
const activeModel:Model<Iactive> = mongoose.model('active',AdminSchema)
export default activeModel