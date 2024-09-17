import { ObjectId } from "mongoose";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IpaymentUseCase {
    getSessionData(sessionId:string,clientId:ObjectId,subscriptionType:object,next:Next):Promise<any>
}