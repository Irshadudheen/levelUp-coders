import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { UserRoute } from './framework/webServer/routes/userRoute'
import { adminRouter } from './framework/webServer/routes/adminRoute'
import connectDb from './framework/webServer/config/db'
import { errMiddleware } from './usecases/middlewares/errorMiddleware'
connectDb()
const app=express()
const router = express.Router()
adminRouter(router)

UserRoute(router)
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',router)
app.use('/admin',router)
app.use(errMiddleware)
app.listen(4000,()=>console.log("the server is running in http://localhost:4000 for auth"))
