import { Iactive } from "../../../../entities/activeDays";
import { IactiveRepository } from "../../../../usecases/interface/repositoryInterface/activeRepository";
import activeModel from "../model/activeDays";

export class ActiveRepository implements IactiveRepository{
    constructor(){}
    
    async find(userId: string): Promise<Iactive | void | null> {
        return await activeModel.findOne({userId})
    }
    async createActiveDays(active:Iactive){
     return  await activeModel.create(active)
    }
    async update(userId:string):Promise<Iactive|null|void>{
        const date ={data:Date.now(),Boolean:true}
        const active = await activeModel.findOneAndUpdate({userId},{$push:{days:{date}}},{new:true})
       
       return active
    }

}