import { ObjectId } from "mongoose";

export interface Iquiz {
    _id?:string;
    questionTitle:string;
    question:string;
    options:object;
    levelId:ObjectId
}