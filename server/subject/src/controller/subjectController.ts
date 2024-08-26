
import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IsubjectUseCase } from "../usecases/interface/usecase/subjectUseCase";
import cloudinary from "../framework/service/cloudinary";

export class SubjectController{
    
    constructor(private subjectUseCase:IsubjectUseCase){
       
    }
    async getAllSubject(req:Req,res:Res,next:Next){
        try {
            const allSubject = await this.subjectUseCase.getAllSubject(next)
            if(allSubject){
                res.json(allSubject).status(201)
            }
        } catch (error) {
            
        }
    }
    async getSubject(req:Req,res:Res,next:Next){
        try {
            console.log('get subject controller',req.body)
            const subject =await this.subjectUseCase.getSubject(req.body.subjectId,next)
           
            if(subject){

                return res.json(subject).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }
    async addSubject(req:Req,res:Res,next:Next){
        try {
            console.log(req.body)
            const{name,description}=req.body
            const filePath:any=req.file?.path          
            const image:any=req.file?.filename
            const subject = await this.subjectUseCase.addSubject({name,description,image,level:[]},filePath,next)
          
            if(subject){
                res.json({...subject,succuss:true}).status(201);
            }
        } catch (error:any) {
            console.log(error.message)
            
        }
    }
   
    
}