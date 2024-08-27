
import { Next } from "../../../../../types/serverPakageTypes";
import levelModel from "../../../model/level";

export const editLevel=async(level:any,levelModels:typeof levelModel)=>{
    try {
        const levelFind=await levelModels.findOne({_id:level.levelId})
        if(!levelFind){
            return {message:'not found'}
        }
        levelFind.name=level.name||levelFind.name;
        levelFind.image=level.image||levelFind.image;
        levelFind.premium=level.premium||levelFind.premium;
        await levelFind.save()
        return levelFind
    } catch (error:any) {
        console.log(error.message)
    }
}