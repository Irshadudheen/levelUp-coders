import { Iactive } from "../../../entities/activeDays";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IactiveUsecase{
    // createActiveDays(active:Iactive,next:Next):Promise<Iactive>
    update(userId:string,next:Next):Promise<Iactive|void|null>
    find(userId:string,next:Next):Promise<Iactive|void|null>
}