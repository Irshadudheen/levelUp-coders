import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

const service = {
    auth:'https://levelup-coders.onrender.com',
    subject:'https://levelup-coders-1.onrender.com',
    meeting:'http://localhost:4005',
    compiler:'http://localhost:3000',
    payment:'https://levelup-payment.onrender.com'

}
app.use('/payment',createProxyMiddleware({target:service.payment,changeOrigin:true}))
app.use('/auth',createProxyMiddleware({target:service.auth,changeOrigin:true}))
app.use('/subject',createProxyMiddleware({target:service.subject,changeOrigin:true}))
app.use('/compiler',createProxyMiddleware({target:service.compiler,changeOrigin:true}))
app.use('/interview',createProxyMiddleware({target:service.meeting,changeOrigin:true}))
const PORT = 4001
app.listen(PORT,()=>{
    console.log(`API Gateway is running on http://localhost:${PORT}`)
})
