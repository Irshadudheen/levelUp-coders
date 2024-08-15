import { ObjectId } from "mongoose";

export interface Ivideo{
_id?: number;
name:string;
videoDescription:string;
levelId:ObjectId;
videoUrl?:string;
}