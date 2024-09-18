import { Iactive } from "../../../entities/activeDays";

export interface IactiveRepository{
    // createActiveDays(active:Iactive):Promise<Iactive>
    update(userId:string):Promise<Iactive|void|null>
    find(userId:string):Promise<Iactive|void|null>
}