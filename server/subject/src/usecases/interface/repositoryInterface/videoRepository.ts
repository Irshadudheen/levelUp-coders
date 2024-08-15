import { Ivideo } from "../../../entities/video";

export interface IvideoRepository{
    upload(videoData:Ivideo):Promise <Ivideo|void>
    getVideo(levelId:string):Promise <Ivideo|null>
}