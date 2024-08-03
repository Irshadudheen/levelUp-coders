import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

const service = {
    auth:'http://localhost:4000',
    subject:'http://localhost:4002',
    meeting:'http://meet-service:4003'

}
app.use('/auth',createProxyMiddleware({target:service.auth,changeOrigin:true}))
app.use('/subject',createProxyMiddleware({target:service.subject,changeOrigin:true}))
const PORT = 4001
app.listen(PORT,()=>{
    console.log(`API Gateway is running on http://localhost:${PORT}`)
})