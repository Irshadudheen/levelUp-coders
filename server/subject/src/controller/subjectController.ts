import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IsubjectUseCase } from "../usecases/interface/subjectUseCase";


export class SubjectController{
    
    constructor(private subjectUseCase:IsubjectUseCase){
       
    }
    async addSubject(req:Req,res:Res,next:Next){
        try {
            console.log(req.body)
            const{name,description,image}=req.body
            const subject = await this.subjectUseCase.addSubject({name,description,image,level:[]},next)
            if(subject){
                res.send(subject).status(201);
            }
        } catch (error) {
            
        }
    }
    
}