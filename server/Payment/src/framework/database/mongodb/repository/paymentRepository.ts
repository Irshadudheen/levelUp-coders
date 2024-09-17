import { Ipayment } from "../../../../entities/payment";
import { IpaymentRepository } from "../../../../usecases/interface/repositoryInterface/paymentRepository";
import subscriptionModel from "../model/paymentModel";

export class PaymentRepository implements IpaymentRepository{
    constructor(private paymentModels:typeof subscriptionModel){}
    async addSubscription(paymentData:Ipayment){
        return await this.paymentModels.create(paymentData)
    }
}