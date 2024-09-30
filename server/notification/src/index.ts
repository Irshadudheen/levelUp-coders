import express, { json, urlencoded } from 'express'
import cors from 'cors'
import cron from 'node-cron'

const app = express()
const PORT = 7777;
app.use(cors())
app.use(json())
app.use(urlencoded({extended:true}))
cron.schedule('* * * * *', () => {
    console.log('Running a task every minute');
  });
app.listen(PORT,()=>console.log(`the server is running on port ${PORT}`))