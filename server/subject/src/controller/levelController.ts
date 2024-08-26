import cloudinary from "../framework/service/cloudinary";
import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IlevelUseCase } from "../usecases/interface/usecase/levelUseCase";

export class LevelController{
    constructor(private levelUseCase:IlevelUseCase){}
    async addLevel(req:Req,res:Res,next:Next){
        try {
            console.log(req.body,'the adding level data in controller')
            const{name,subjectId,premium}=req.body
            const filePath:any=req.file?.path          
            const image:any=req.file?.filename
            const level = await this.levelUseCase.createLevel({name,image,subjectId,premium},filePath,next)
        
            res.json({...level,succuss:true}).status(201)
        } catch (error:any) {
            console.log(error.message)
        }
    }
    async getLevel(req:Req,res:Res,next:Next){
        try {
            console.log(req.query)
          
            const {subjectId}=req.query
            const level = await this.levelUseCase.getAllLevel(subjectId as string,next);
            
            if(level){

                res.json(level).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }
    async upladVideo(req:Req,res:Res,next:Next){
        try {
            const{name,videoDescription,levelId}=req.body
            const filePath= req.file?.path
            if(filePath){
          
                
           const video =await this.levelUseCase.uploadVideo({name,videoDescription,levelId},filePath,next)
          
           res.json(video).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }
    async getVideo (req:Req,res:Res,next:Next){
        try {
            const{levelId}=req.query
            const video = await this.levelUseCase.getVideo(levelId as string,next)
            if(video){
                res.json(video).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
        }
        }
    async addQuiz(req:Req,res:Res,next:Next){
        try {
            const{questionTitle,question,levelId,options}=req.body
        
            const quiz = await this.levelUseCase.addQuiz({questionTitle,question,options,levelId},next)
            res.json({...quiz,succuss:true}).status(201);
        } catch (error:any) {
            console.log(error.message)
        }
    }
    async getQuiz(req:Req,res:Res,next:Next){
        const{levelId}=req.query;
        const quiz = await this.levelUseCase.getQuiz(levelId as string,next)
      
        if(quiz){
            res.json(quiz).status(201)
        }
    }
}