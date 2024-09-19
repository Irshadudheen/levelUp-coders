import { ObjectId } from "mongoose";
import { Next } from "../../../framework/types/serverPakageTypes";
import { Ipayment } from "../../../entities/payment";

export interface IpaymentUseCase {
    getSessionData(sessionId:string,clientId:ObjectId,subscriptionType:object,next:Next):Promise<any>
    findSubscription(clientId:string):Promise<Ipayment|null|void>
}