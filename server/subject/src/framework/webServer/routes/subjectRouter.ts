import upload from "../../service/multer"
import { Route,Next,Req,Res } from "../../types/serverPakageTypes"
import { isAdmin } from "../middleware/roleAuth"
import { levelController, subjectController } from "./injections/injections"
export function subjectRoute(router:Route){
   
    router.post('/addSubject',isAdmin,upload,(req:Req,res:Res,next:Next)=>{
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
    router.post('/addLevel',isAdmin,upload,(req:Req,res:Res,next:Next)=>{
        console.log("akdjfasdkljsdf")
        levelController.addLevel(req,res,next)
    })
    router.get('/getLevel',(req:Req,res:Res,next:Next)=>{
        levelController.getLevel(req,res,next)
    })
    router.post('/uploadVideo',isAdmin,upload,(req:Req,res:Res,next:Next)=>{
       console.log(req.body,req.file)
        levelController.upladVideo(req,res,next)
    })
    router.get('/getVideo',(req:Req,res:Res,next:Next)=>{
        console.log(req.query)
        levelController.getVideo(req,res,next)

    })
    router.post('/addQuiz',isAdmin,(req:Req,res:Res,next:Next)=>{
        console.log(req.body)
        levelController.addQuiz(req,res,next)
    })
    router.get('/getQuiz',(req:Req,res:Res,next:Next)=>{
        console.log(req.query)
        levelController.getQuiz(req,res,next)
    })
}