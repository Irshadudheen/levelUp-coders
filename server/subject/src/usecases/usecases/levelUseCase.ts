import { Ilevel } from "../../entities/level";
import { Icloudinary } from "../../framework/service/cloudinary";
import { Next } from "../../framework/types/serverPakageTypes";
import { IlevelRepository } from "../interface/repositoryInterface/levelRepository";
import { IlevelUseCase } from "../interface/usecase/levelUseCase";
import { createLevel, getLevel } from "./level/index";

export class LevelUseCase implements IlevelUseCase{
    constructor(private levelRepository:IlevelRepository,
        private cloudinary:Icloudinary
    ){}
    async getAllLevel(subjectId: string, next: Next): Promise<Ilevel[] | void> {
        return await getLevel(subjectId,this.levelRepository,next)
    }
    async createLevel(level:Ilevel,filePath:string,next:Next):Promise<Ilevel|void>{
        return await createLevel(level,filePath,this.cloudinary,this.levelRepository,next)
    }
}