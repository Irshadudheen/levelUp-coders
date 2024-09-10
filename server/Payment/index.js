import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import Stripe from 'stripe';

const app = express();
const PORT = 3001;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

app.use(cors());
app.use(express.json());
const getSessionData = async (checkoutSessionId) => {
    try {
        // Retrieve the session using the checkout session ID
        const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
            expand: ['line_items'],  // Expanding line_items to ensure they are fetched
        });
        console.log(session,'the daa')
  
        // Destructure the data from the session
        const { payment_status, customer, amount_total, metadata } = session;
  
        // If the session has line items and metadata, retrieve product details
        const lineItems = session.line_items || [];  // Get line items (if available)
        const productMetadata = lineItems[0]?.price?.product?.metadata || {};  // Access product metadata if it exists
        console.log(lineItems.data)
        // Custom metadata you included in the session
        const description = metadata?.description || 'No description';
        const features = metadata?.features ? metadata.features.split(', ') : [];  // Convert to array or default to an empty array
        const icon = metadata?.icon || '';
        const popular = metadata?.popular === 'Yes';
  
        // Handle the session data here
        console.log('Payment Status:', payment_status);
        console.log('Customer ID:', customer);
        console.log('Amount Total (in cents):', amount_total);
        console.log('Product Metadata:', { description, features, icon, popular });
        
        return {
            payment_status,
            customer,
            amount_total,
            description,
            features,
            icon,
            popular,
        };
    } catch (error) {
        console.error('Error retrieving session:', error);
        throw error;
    }
};
  app.get('/success/:sessionId', async (req, res) => {
    const {sessionId} = req.params;
  console.log(sessionId)
//   console.clear()
  
    // Fetch session data using the function above
    const sessionData = await getSessionData(sessionId);
  
    // Do something with the session data (e.g., save to your database, display success message, etc.)
    res.json({ message: 'Payment successful', sessionData });
  });

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { name, monthlyPrice, description, features, icon, popular } = req.body;
        console.log(description)
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
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send({ error: 'Failed to create checkout session' });
    }
});


app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
