import { Model, model, Schema } from "mongoose";
import { Ivideo } from "../../../../entities/video";


const videoSchema:Schema<Ivideo>=new Schema({
    name:{type:String,required:true},
    videoDescription:{type:String,required:true},
    levelId:{type:Schema.ObjectId,required:true},
    videoUrl:{type:String,required:true},
})
const videoModel:Model<Ivideo>=model('video',videoSchema)
export default videoModel