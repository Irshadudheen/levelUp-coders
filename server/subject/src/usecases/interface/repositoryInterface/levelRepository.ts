import { ObjectId } from "mongoose";
import { Ilevel } from "../../../entities/level";

export interface IlevelRepository{
    addLevel(level:Ilevel):Promise<Ilevel>
    getLevel(subjectId:string):Promise<Ilevel[]|void>
    editLevel(level:object):Promise<object|void>
    addUser(levelId:string,userId:ObjectId):Promise<Ilevel|void>
}