import { Next } from "../../../framework/types/serverPakageTypes";
import {Iuser} from '../../../entities/user'


export interface IuserUseCase{
   
    createUser(user:Iuser) : Promise <Iuser| void>
    // createActiveDays(active:Iactive,next:Next):Promise<Iactive|void|null>
}