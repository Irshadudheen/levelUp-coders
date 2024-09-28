import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IactiveUsecase } from "../usecases/interface/usecase/activeUsecase";

export class ActiveController{
    private activeUseCase:IactiveUsecase;
    constructor(activeUseCase:IactiveUsecase){
        this.activeUseCase = activeUseCase;
    }
    async findActiveDays(req:Req,res:Res,next:Next){
        try {
            const {userId}=req.body;
            console.log(req.body)
            const activeDays = await this.activeUseCase.find(userId,next)
            if(activeDays){
                console.log(activeDays)
                res.json(activeDays)
            }
        } catch (error) {
            
        }
    }
    async updateActiveDays(req:Req,res:Res,next:Next){
        try {
            const {userId}=req.body
            console.log(req.body)
            const activeDays = this.activeUseCase.update(userId,next)
            if(activeDays){
             return res.json(activeDays)
            }
        } catch (error) {
            
        }
    }
    async getToptenActiveUser(req:Req,res:Res,next:Next){
        try {
            const topTenActiveUser =await this.activeUseCase.toTenUser(next)
            console.log(topTenActiveUser)
            if(topTenActiveUser){
                res.json(topTenActiveUser).status(201)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }
}