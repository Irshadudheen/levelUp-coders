import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IcompilerUseCase } from "../usecases/interface/usecase/compilerUseCase";

export class CompilerController{
    constructor(private compilerUseCase:IcompilerUseCase){}
    async createCompiler(req:Req,res:Res,next:Next){
        try {
            console.log(req.body,'the controller')
            const {question_description,question_title,sample_input,sample_output,input_format,output_format,levelId}=req.body
            const compiler = await this.compilerUseCase.createCompiler({question_title,question_description,input_format,output_format,levelId,sample_input,sample_output},next)
            if(compiler){
                res.status(201).json(compiler)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }
    async findCompiler(req:Req,res:Res,next:Next){
        try {
            console.log(req.body,'the  controller')
            const {levelId}=req.params;
            const compiler = await this.compilerUseCase.getCompiler(levelId,next)
            if(compiler){
                res.status(201).json(compiler)
            }

        } catch (error:any) {
            console.log(error.message)
        }
    }
}