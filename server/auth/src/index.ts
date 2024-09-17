import express,{urlencoded,json} from 'express'
import { Kafka, KafkaMessage } from "kafkajs";
import cors from 'cors'
import cookieParser from "cookie-parser"
import { UserRoute } from './framework/webServer/routes/userRoute'
import { adminRouter } from './framework/webServer/routes/adminRoute'
import connectDb from './framework/webServer/config/db'
import { errMiddleware } from './usecases/middlewares/errorMiddleware'


const start = async ()=>{
    try {
        if(!process.env.JWT_VERIFICATION_KEY){
            throw new Error('JWT_VERIFI_KEY is not found')
        }
        if(!process.env.JWT_ACCESS_KEY){
            throw new Error('JWT_ACCESS_KEY is not found')
        }
        if(!process.env.JWT_REFRESH_KEY){
            throw new Error('JWT_REFRESH_KEY is not found')
        }
        if(!process.env.mongodb){
            throw new Error('mongodburl is not found')
        }
        if(!process.env.MATLER_EMAIL){
            throw new Error('MATLER_EMAIL is not found')
        }
        if(!process.env.MATLER_PASSWORD){
            throw new Error('MATLER_PASSWORD is not found')
        }
        connectDb()

    } catch (error) {
        console.error(error)
    }
}
start()

const app = express()

// Separate routers for user and admin
const userRouter = express.Router()
const adminRouterInstance = express.Router()

// Set up routes on the separate routers
UserRoute(userRouter)
adminRouter(adminRouterInstance)

app.use(cors());
app.use(cookieParser())
app.use(json())
app.use(urlencoded({extended:true}))

// Apply the separate routers to different paths
app.use('/user', userRouter)
app.use('/admin', adminRouterInstance)
app.use(errMiddleware)

app.listen(4000, () => console.log("the server is running in http://localhost:4000 for auth"))
