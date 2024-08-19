
import { Route,Next,Req,Res } from "../../types/serverPakageTypes"
import {  } from "./injections/injections"
export function subjectRoute(router:Route){
   
    router.post('/runCompiler',(req:Req,res:Res,next:Next)=>{
      
        subjectController.addSubject(req,res,next)
    })
    router.post('/getSubject',(req:Req,res:Res,next:Next)=>{
        console.log('comming in router of get subject')
        subjectController.getSubject(req,res,next)
    })
    router.post('/getAllSubject',(req:Req,res:Res,next:Next)=>{
        subjectController.getAllSubject(req,res,next)
    })
    router.post('/addLevel',upload,(req:Req,res:Res,next:Next)=>{
        console.log("akdjfasdkljsdf")
        levelController.addLevel(req,res,next)
    })
    router.get('/getLevel',(req:Req,res:Res,next:Next)=>{
        levelController.getLevel(req,res,next)
    })
    router.post('/uploadVideo',upload,(req:Req,res:Res,next:Next)=>{
       console.log(req.body,req.file)
        levelController.upladVideo(req,res,next)
    })
    router.get('/getVideo',(req:Req,res:Res,next:Next)=>{
        console.log(req.query)
        levelController.getVideo(req,res,next)

    })
    router.post('/addQuiz',(req:Req,res:Res,next:Next)=>{
        console.log(req.body)
        levelController.addQuiz(req,res,next)
    })
    router.get('/getQuiz',(req:Req,res:Res,next:Next)=>{
        console.log(req.query)
        levelController.getQuiz(req,res,next)
    })
}