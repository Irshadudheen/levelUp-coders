import { Ilevel } from "../../../../../entities/level";
import { IlevelRepository } from "../../../../../usecases/interface/repositoryInterface/levelRepository";
import levelModel from "../../model/level";
import { createLevel, getAllLevel,editLevel } from "./level/index";

export class LevelRepository implements IlevelRepository{
    constructor(private levelModels:typeof levelModel){}
  async editLevel(level: object): Promise<object | void> {
  return await  editLevel(level,this.levelModels)
  }
  async  getLevel(subjectId: string): Promise<Ilevel[]|void> {
    console.log(subjectId,"in subjectId")
       return await getAllLevel(subjectId,this.levelModels)
    }
async addLevel(level:Ilevel){
    return await createLevel(level,this.levelModels)
}
}