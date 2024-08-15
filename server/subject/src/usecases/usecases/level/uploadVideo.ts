import { Ivideo } from "../../../entities/video";
import { Icloudinary } from "../../../framework/service/cloudinary";
import { Next } from "../../../framework/types/serverPakageTypes";
import { IvideoRepository } from "../../interface/repositoryInterface/videoRepository";

export const upload=async(videoData:Ivideo,filePath:string,videoRepository:IvideoRepository,clodinary:Icloudinary,next:Next)=>{
    try {
        const uploadResponse = await clodinary.v2.uploader.upload(filePath,{resource_type:'video'})
        console.log("the upladerrrrrrr")
        console.log(uploadResponse.secure_url,'the secure url')
        videoData.videoUrl=uploadResponse.secure_url
      const video= await  videoRepository.upload(videoData)
        console.log(video,'the video in usecase')
        return video
    } catch (error:any) {
        console.log(error.message,"haihaiahiahiahiahiahi")
    }
}