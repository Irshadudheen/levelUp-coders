
import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IsubjectUseCase } from "../usecases/interface/usecase/subjectUseCase";


export class SubjectController{
    
    constructor(private subjectUseCase:IsubjectUseCase){
       
    }
    async actionCourse(req:Req,res:Res,next:Next){
        try {
            const {subjectId}=req.params;
            const subject = await this.subjectUseCase.listCourse(subjectId,next)
            if(subject){
                res.json(subject).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
            
        }
    }
    async updateSubject(req:Req,res:Res,next:Next){
        try {
            const {name,description,image,categoryId}=req.body;
            const {subjectId}=req.params;
            const subject = await this.subjectUseCase.editSubject({name,description,image,categoryId},subjectId,next)
            if(subject){
                res.json(subject).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
            
        }
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
            const{name,description,categoryId}=req.body
            const filePath:any=req.file?.path          
            const image:any=req.file?.filename
            const subject = await this.subjectUseCase.addSubject({categoryId,name,description,image},filePath,next)
          
            if(subject){
                res.json({...subject,succuss:true}).status(201);
            }
        } catch (error:any) {
            console.log(error.message)
            
        }
    }
   
    
}