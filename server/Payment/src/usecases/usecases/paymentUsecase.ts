import { ObjectId } from "mongoose";
import { Next } from "../../framework/types/serverPakageTypes";
import { IpaymentRepository } from "../interface/repositoryInterface/paymentRepository";
import { IpaymentUseCase } from "../interface/usecase/paymentUseCase";
import Stripe from "stripe";
import { Ipayment } from "../../entities/payment";


interface SessionData {
    payment_status: Stripe.Checkout.Session.PaymentStatus;
   
    amount_total: number | null;
    description: string;
    features: string[];
    icon: string;
    popular: boolean;
}

export class PaymentUseCase implements IpaymentUseCase {
    constructor(private paymentRepository:IpaymentRepository){}
    async findSubscription(clientId:string):Promise<Ipayment|null|void>{
        const data = await this. paymentRepository.findPayment(clientId)
        if(data){
            return data
        }
    }
    async getSessionData(checkoutSessionId: string,clientId:ObjectId,subscriptionType:object, next: Next): Promise<SessionData> {
        try {
        
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' as any });
           
            const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
                expand: ['line_items.data.price.product'],  
            });
            console.log(session, 'the data');

            const { payment_status, amount_total, metadata } = session;

            const lineItems: Stripe.LineItem[] = session.line_items?.data || [];  
  
            console.log('lineItems:',lineItems);

            const description: string = metadata?.description || 'No description';
            const features: string[] = metadata?.features ? metadata.features.split(', ') : []; 
            const icon: string = metadata?.icon || '';
            const popular: boolean = metadata?.popular === 'Yes';

            console.log('Payment Status:', payment_status);
            
            console.log('Amount Total (in cents):', amount_total);
            console.log('Product Metadata:', { description, features, icon, popular });

            console.log('subscriptionType is ',subscriptionType)
           const data= await this.paymentRepository.addSubscription({
                clientId,
                expireAt: new Date(), 
                subscriptionType,
               
              });
              console.log(data)
            return {
                payment_status,
                amount_total,
                description,
                features,
                icon,
                popular,
            };
        } catch (error:any) {
            console.log('Error retrieving session:', error.message);
            throw error;
        }
    }
}
