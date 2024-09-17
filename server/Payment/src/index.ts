import express, { json, Router, urlencoded } from 'express'
import cors from 'cors'
import runPaymentConsumer from './framework/services/messageBroker/consumer'
import connectDb from './framework/webServer/config/db'
import { paymentRout } from './framework/webServer/routes/paymentRoute'

const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Start database and message broker
const start = async () => {
  await connectDb()
  await runPaymentConsumer()
}
start()

// Initialize router and apply payment routes
const payementRouter = Router()
paymentRout(payementRouter) // This function registers routes on the router

// Use the router in the app
app.use('/', payementRouter)

const PORT = 3001
app.listen(PORT, () => console.log(`The server is running on port ${PORT} for payment`))
