import { ObjectId } from "mongoose";
import levelModel from "../../../model/level";

export const addUser = async(levelId:string,userId:ObjectId,levelModels:typeof levelModel)=>{
    try {
        const level = await levelModels.findById(levelId);
        if(level){
            if (!level.users) {
                level.users = [];  // Initialize as an empty array if undefined
            }
           const check= level.users.some((user:ObjectId) => user.toString()===userId.toString())
           if(!check){
            level.users.push(userId )
            await level.save()
            
           }
           return level
        }
        
    } catch (error) {
        
    }
}