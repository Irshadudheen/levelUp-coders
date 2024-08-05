import { Route,Next,Req,Res } from "../../types/serverPakageTypes"
import { subjectController } from "./injections/injections"
export function subjectRoute(router:Route){
   
    router.post('/addSubject',(req:Req,res:Res,next:Next)=>{
       console.log('comming in router of add subject')
        subjectController.addSubject(req,res,next)
    })
}