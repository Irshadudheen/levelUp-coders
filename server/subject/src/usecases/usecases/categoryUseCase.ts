import { Icategory } from "../../entities/category";
import { Next } from "../../framework/types/serverPakageTypes";
import { IcategoryRepository } from "../interface/repositoryInterface/categoryRepository";
import { IcategoryUseCase } from "../interface/usecase/categoryUseCase";

export class CategoryUseCase implements IcategoryUseCase{
    constructor(private categoryRepository:IcategoryRepository){}
  async  createCategory(category: Icategory, next: Next): Promise<Icategory|object> {
        return await this.categoryRepository.createCategory(category)   
    }
   async getCategories(next: Next): Promise<Icategory[]> {
       return await this.categoryRepository.findAll()
    }
   async getCategoryById(id: string, next: Next): Promise<Icategory|object> {
        return await this.categoryRepository.findById(id)
    }
    updateCategory(category: Icategory, next: Next): Promise<Icategory> {
        throw new Error("Method not implemented.");
    }
    blockCategory(id: string, next: Next): Promise<void> {
        throw new Error("Method not implemented.");
    }
    unblockCategory(id: string, next: Next): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}