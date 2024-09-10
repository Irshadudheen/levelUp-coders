import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import Stripe from 'stripe';

const app = express();
const PORT = 3001;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });  // Use correct secret key

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { product } = req.body;

  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: product.monthlyPrice * 100,  // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3001/succuss`,
      cancel_url: `http://localhost:3001/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create checkout session' });
  }
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
