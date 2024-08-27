import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IcategoryUseCase } from "../usecases/interface/usecase/categoryUseCase";

export class CategoryController{
    constructor(private categoryUseCase:IcategoryUseCase){}
    async creatCategory(req:Req,res:Res,next:Next){
        const{name,description}=req.body
        const category=await this.categoryUseCase.createCategory({name,description},next)
        if(category){
            res.json(category).status(201)
        }
    }
    async getCategory(req:Req,res:Res,next:Next){
        const {id}=req.body
        const category = await this.categoryUseCase.getCategoryById(id,next)
        if(category){
            res.json(category)
        }
    }
    async allCategory(req:Req,res:Res,next:Next){
        const categories = await this.categoryUseCase.getCategories(next)
        if(categories){
            res.json(categories).status(201)
        }
    }
}