import { Ilevel } from "../../../entities/level";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IlevelUseCase{
    createLevel(level:Ilevel,filePath:string,next:Next):Promise<Ilevel|void>
    getAllLevel(subjectId:string,next:Next):Promise<Ilevel[]|void>
}