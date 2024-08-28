import { ObjectId } from "mongoose";

export interface Isubject {
    _id?:string;
    name:string;
    description:string;
    image:string;
    is_blocked?:boolean;
   
    categoryId:ObjectId
}