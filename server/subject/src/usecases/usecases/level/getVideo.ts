import { Next } from "../../../framework/types/serverPakageTypes";
import { IvideoRepository } from "../../interface/repositoryInterface/videoRepository";

export const getVideo = async (levelId:string,videoRepository:IvideoRepository,next:Next)=>{
try {
   return await videoRepository.getVideo(levelId)
} catch (error) {
    throw error
}
}