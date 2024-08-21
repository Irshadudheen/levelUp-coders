
import { Route,Next,Req,Res } from "../../types/serverPakageTypes"
import {  compilerController } from "./injections/injection"
export function subjectRoute(router:Route){
   
    router.post('/creatCompiler',(req:Req,res:Res,next:Next)=>{
      
        compilerController.createCompiler(req,res,next)
    })
    router.get('/getCompiler',(req:Req,res:Res,next:Next)=>{
        console.log('comming in router of get subject')
        compilerController.findCompiler(req,res,next)
    })
    router.post('/runSubject',(req:Req,res:Res,next:Next)=>{
        // subjectController.getAllSubject(req,res,next)
    })
    
}