import { ObjectId } from "mongoose";

export interface Iactive{
    _id?:ObjectId
    userId:ObjectId;
    days?:[{date:Date,isActive:boolean}]
}