import express from "express";
import cors from 'cors'
import logger from "./framework/webServer/config/logger";
import morgan from 'morgan'
import { subjectRoute } from "./framework/webServer/routes/subjectRouter";
import connectDb from "./framework/webServer/config/db";

const morganFormat = ':method :url :status :response-time ms';

const app= express()
connectDb()
app.use(morgan(morganFormat,{
    stream:{
        write:(message)=>{
            
            const logObject ={
                method:message.split(' ')[0],
                url:message.split(' ')[1],
                status:message.split(' ')[2],
                responseTime:message.split(' ')[3]
            };
            logger.info(JSON.stringify(logObject))
        }
    }
}))

app.use(cors())
app.use(express.json())
const router = express.Router()
subjectRoute(router)
app.use('/subject',router)
app.listen(4002,()=>{
    console.log('server is running in 4002 in subject')
})
