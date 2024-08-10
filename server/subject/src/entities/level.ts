import { ObjectId } from "mongoose";

export interface Ilevel{
    _id?:string;
    name:string;
    premium?:boolean;
    video:string;
    image:string;
    videoDescription:string;
    subjectId:ObjectId;
    
}