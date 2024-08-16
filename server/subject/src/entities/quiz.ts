import { ObjectId } from "mongoose";

export interface Iquiz {
    _id?:string;
    questoinTitle:string;
    question:string;
    options:object;
    levelId:ObjectId
}