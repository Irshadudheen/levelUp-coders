import { Ipayment } from "../../../entities/payment";

export interface IpaymentRepository{
    addSubscription(paymentData:Ipayment):Promise<Ipayment>
}