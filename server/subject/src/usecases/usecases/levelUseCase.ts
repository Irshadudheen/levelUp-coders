import { Ilevel } from "../../entities/level";
import { Ivideo } from "../../entities/video";
import { Icloudinary } from "../../framework/service/cloudinary";
import { Next } from "../../framework/types/serverPakageTypes";
import { IlevelRepository } from "../interface/repositoryInterface/levelRepository";
import { IvideoRepository } from "../interface/repositoryInterface/videoRepository";
import { IlevelUseCase } from "../interface/usecase/levelUseCase";
import { createLevel, getLevel ,getVideo,upload} from "./level/index";

export class LevelUseCase implements IlevelUseCase{
    constructor(private levelRepository:IlevelRepository,
        private cloudinary:Icloudinary,
        private videoRepository:IvideoRepository
    ){}
    async getVideo(levelId: string, next: Next): Promise<Ivideo | null> {
        return await getVideo(levelId,this.videoRepository,next)
    }
    async getAllLevel(subjectId: string, next: Next): Promise<Ilevel[] | void> {
        return await getLevel(subjectId,this.levelRepository,next)
    }
    async createLevel(level:Ilevel,filePath:string,next:Next):Promise<Ilevel|void>{
        return await createLevel(level,filePath,this.cloudinary,this.levelRepository,next)
    }
    async uploadVideo(videoData:Ivideo,filePath:string,next:Next):Promise<Ivideo|void>{
        console.log('the upload in usecase')
        return await upload(videoData,filePath,this.videoRepository,this.cloudinary,next)
    }
}