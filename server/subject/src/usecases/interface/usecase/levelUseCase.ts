import { Ilevel } from "../../../entities/level";
import { Iquiz } from "../../../entities/quiz";
import { Ivideo } from "../../../entities/video";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IlevelUseCase{
    createLevel(level:Ilevel,filePath:string,next:Next):Promise<Ilevel|void>
    getAllLevel(subjectId:string,next:Next):Promise<Ilevel[]|void>
    uploadVideo(videoData:Ivideo,filePath:string,next:Next):Promise<Ivideo|void>
    getVideo(levelId:string,next:Next):Promise <Ivideo|null>
    addQuiz(quiz:Iquiz,next:Next):Promise<Iquiz|void>
    getQuiz(levelId:string,next:Next):Promise<Iquiz[]|void|null>
    editLevel(level:object,next:Next):Promise<object|void>
}