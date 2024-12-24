import express, { json, Router, urlencoded } from 'express';
import cors from 'cors';

import connectDb from './framework/webServer/config/db';
import { paymentRout } from './framework/webServer/routes/paymentRoute';
import consumeUserData from './framework/services/messageBroker/consumer';

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Start database and message broker
const start = async () => {
  try {
    await connectDb();
    consumeUserData();
  } catch (error) {
    console.error("Error starting services:", error);
  }
};
start();

// Initialize router and apply payment routes
const paymentRouter = Router();
paymentRout(paymentRouter); // Ensure paymentRout properly registers routes

// Use the router in the app (corrected path)
app.use('/payment', paymentRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`The server is running on port ${PORT} for payment`));
