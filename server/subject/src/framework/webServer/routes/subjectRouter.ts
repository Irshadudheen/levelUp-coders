import upload from "../../service/multer"
import { Route,Next,Req,Res } from "../../types/serverPakageTypes"
import { subjectController } from "./injections/injections"
export function subjectRoute(router:Route){
   
    router.post('/addSubject',upload,(req:Req,res:Res,next:Next)=>{
       console.log('comming in router of add subject')
        subjectController.addSubject(req,res,next)
    })
    router.post('/getSubject',(req:Req,res:Res,next:Next)=>{
        console.log('comming in router of get subject')
        subjectController.getSubject(req,res,next)
    })
    router.post('/getAllSubject',(req:Req,res:Res,next:Next)=>{
        subjectController.getAllSubject(req,res,next)
    })
}