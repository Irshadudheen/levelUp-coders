import { Ilevel } from "../../../../../../entities/level";
import levelModel from "../../../model/level";

export const getAllLevel = async (subjectId:string,levelModels:typeof levelModel):Promise<Ilevel[]|void>=>{
    try {
      
       const level= await levelModels.find({subjectId})
   
       return level
    } catch (error:any) {
        console.log(error.message)
    }
}