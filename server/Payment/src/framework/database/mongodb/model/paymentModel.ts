import { Model, model, Schema,Types } from "mongoose";
import { Ipayment } from "../../../../entities/payment";

const paymentSchema:Schema<Ipayment> = new Schema({
    clientId:{type:Types.ObjectId,required:true ,ref:'user'},
    createAt:{type:Date,required:true,default:Date.now},
    expireAt:{type:Date,required:true},
    expired:{type:Boolean,require:true,default:false},
    subscriptionType:{type:Object,required:true}
})
const subscriptionModel:Model<Ipayment> =  model('subscription',paymentSchema)
export default subscriptionModel