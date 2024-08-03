import mongoose, { mongo } from 'mongoose'
require('dotenv').config()
const dbString:string = process.env.mongodb ||''
const connectDb= async ()=>{
    try {
        await mongoose.connect(dbString)
        .then((data:any)=>{console.log(`db connected on ${data.connection.host}`)})
        
    } catch (error:any) {
        console.log(error.message)
        setTimeout(connectDb,5000)
    }
}
export default connectDb