import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IlevelUseCase } from "../usecases/interface/usecase/levelUseCase";

export class LevelController{
    constructor(private levelUseCase:IlevelUseCase){}
    async addLevel(req:Req,res:Res,next:Next){
        try {
            console.log(req.body)
            const{name,video,videoDescription,subjectId}=req.body
            const filePath:any=req.file?.path          
            const image:any=req.file?.filename
            console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
            const level = await this.levelUseCase.createLevel({name,video,image,videoDescription,subjectId},filePath,next)
            console.log(level,'added level')
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
            console.log(level)
            if(level){

                res.json(level).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }
}