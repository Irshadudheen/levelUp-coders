import { ObjectId } from "mongoose";

export interface Ipayment{
    clientId:ObjectId;
    createAt?:Date;
    expireAt:Date;
    expired?:Boolean;
    subscriptionType:Object;
}