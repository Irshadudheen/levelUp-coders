import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { UserRoute } from './framework/webServer/routes/userRoute'
import { adminRouter } from './framework/webServer/routes/adminRoute'
import connectDb from './framework/webServer/config/db'
import { errMiddleware } from './usecases/middlewares/errorMiddleware'

connectDb()

const app = express()

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouterInstance = express.Router()

// Set up routes on the separate routers
UserRoute(userRouter)
adminRouter(adminRouterInstance)

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Apply the separate routers to different paths
app.use('/user', userRouter)
app.use('/admin', adminRouterInstance)
app.use(errMiddleware)

app.listen(4000, () => console.log("the server is running in http://localhost:4000 for auth"))
