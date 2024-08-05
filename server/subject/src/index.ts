import express from "express";
import cors from 'cors'
import { subjectRoute } from "./framework/webServer/routes/subjectRouter";
import connectDb from "./framework/webServer/config/db";
const app= express()
connectDb()
app.use(cors())
app.use(express.json())
const router = express.Router()
subjectRoute(router)
app.use('/subjectRouter',router)
app.listen(4002,()=>{
    console.log('server is running in 4002 in subject')
})
