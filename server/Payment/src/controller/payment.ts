import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import Stripe from 'stripe';
import { IpaymentUseCase } from "../usecases/interface/usecase/paymentUseCase";

export class PaymentController{
    private paymentUseCase:IpaymentUseCase;
    constructor(paymentUseCase:IpaymentUseCase){
            this.paymentUseCase=paymentUseCase
        }
        async findUserPayment(req:Req,res:Res,next:Next){
            try {
                const{clientId}=req.body;
                const payment = await this.paymentUseCase.findSubscription(clientId)
                if(payment){
                    res.json(payment)
                }
            } catch (error) {
                
            }
        }
        async success(req:Req,res:Res,next:Next){
            try {
                const {sessionId} = req.params;
                const {clientId,paymentType}=req.body
                // console.log(req.body)
                console.log(req.body)
                  console.log(sessionId)
                
                   
                    const sessionData = await this.paymentUseCase.getSessionData(sessionId,clientId,paymentType,next);
                  
                  console.log('hiahaihaihai')
                    res.json({ message: 'Payment successful', sessionData });
            } catch (error:any) {
                console.log(error.message)
            }
        }
        
        async checkout(req:Req,res:Res,next:Next){
            try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' as any });
            const { name, monthlyPrice, description, features, icon, popular } = req.body;
            console.log(description)
            console.log(process.env.STRIPE_SECRET_KEY)
            // Create a Checkout Session with metadata
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name:description,
                                metadata: {   // Add custom metadata to product
                                    description: description,
                                    features: features.join(', '),  // Convert features array to string
                                    icon: icon,
                                    popular: popular ? 'Yes' : 'No',
                                },
                            },
                            unit_amount: monthlyPrice * 100,  // Amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.SUCCESS}/{CHECKOUT_SESSION_ID}`,  // Correct success URL
                cancel_url: process.env.FAILURE,
            });
            
            res.json({ id: session.id });
        } catch (error:any) {
            console.log(error.message)
            
        }
    }
}