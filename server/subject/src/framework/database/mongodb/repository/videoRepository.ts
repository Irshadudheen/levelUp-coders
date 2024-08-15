import { Ivideo } from "../../../../entities/video";
import { IvideoRepository } from "../../../../usecases/interface/repositoryInterface/videoRepository";
import videoModel from "../model/video";

export class VideoRepository implements IvideoRepository{
    constructor(private videoModels:typeof videoModel){}
   async upload(videoData:Ivideo):Promise <Ivideo|void> {
       return await this.videoModels.create(videoData)
    }
    async getVideo(levelId:string):Promise<Ivideo|null>{
        return await this.videoModels.findOne({levelId})
    }
}