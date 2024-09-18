import { ObjectId } from "mongoose";

export interface Ilevel{
    _id?:string;
    name:string;
    premium?:boolean;
 
    image:string;
    users?:ObjectId[];
    subjectId:ObjectId;
    
}