import { Ilevel } from "../../../entities/level";
import { Icloudinary } from "../../../framework/service/cloudinary";
import { Next } from "../../../framework/types/serverPakageTypes";
import { IlevelRepository } from "../../interface/repositoryInterface/levelRepository";

export const createLevel=async(level:Ilevel,filePath:string,cloudinary:Icloudinary,levelRepository:IlevelRepository,next:Next)=>{
    try {
        const res= await cloudinary.v2.uploader.upload(filePath)
        level.image=res.secure_url
        return await levelRepository.addLevel(level)
        
    } catch (error:any) {
       console.log(error.message)
    }
}