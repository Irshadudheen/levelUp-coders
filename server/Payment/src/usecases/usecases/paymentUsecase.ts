import { ObjectId } from "mongoose";
import { Next } from "../../framework/types/serverPakageTypes";
import { IpaymentRepository } from "../interface/repositoryInterface/paymentRepository";
import { IpaymentUseCase } from "../interface/usecase/paymentUseCase";
import Stripe from "stripe";

// Define a type for the return value of getSessionData
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
    async getSessionData(checkoutSessionId: string,clientId:ObjectId,subscriptionType:object, next: Next): Promise<SessionData> {
        try {
            // Initialize Stripe with the secret key and API version
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' as any });

            // Retrieve the session using the checkout session ID
            const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
                expand: ['line_items.data.price.product'],  // Expand product and metadata
            });
            console.log(session, 'the data');

            // Destructure the data from the session
            const { payment_status, amount_total, metadata } = session;

            // If the session has line items and metadata, retrieve product details
            const lineItems: Stripe.LineItem[] = session.line_items?.data || [];  // Get line items (if available)
            // const productMetadata = lineItems[0]?.price?.product?.metadata || {};  // Access product metadata if it exists
            console.log('lineItems:',lineItems);

            // Custom metadata you included in the session
            const description: string = metadata?.description || 'No description';
            const features: string[] = metadata?.features ? metadata.features.split(', ') : [];  // Convert to array or default to an empty array
            const icon: string = metadata?.icon || '';
            const popular: boolean = metadata?.popular === 'Yes';

            // Handle the session data here
            console.log('Payment Status:', payment_status);
            
            console.log('Amount Total (in cents):', amount_total);
            console.log('Product Metadata:', { description, features, icon, popular });

            // Return session data as a structured object
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
