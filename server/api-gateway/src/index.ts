import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

const service = {
    auth:'http://localhost:4000',
    subject:'http://localhost:4002',
    meeting:'http://localhost:4005',
    compiler:'http://localhost:3000',
    payment:'http://localhost:3001'

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