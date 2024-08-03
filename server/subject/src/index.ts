import express from "express";
import cors from 'cors'
const app= express()
app.use(cors())
app.use(express.json())
const router = express.Router()
subjectRoute(router)
app.use('/subjectRouter',subjectRoute)
app.listen(4002,()=>{
    console.log('server is running in 4002 in subject')
})
