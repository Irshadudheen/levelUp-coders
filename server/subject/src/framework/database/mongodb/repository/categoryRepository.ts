import { Icategory } from "../../../../entities/category";
import { IcategoryRepository } from "../../../../usecases/interface/repositoryInterface/categoryRepository";
import categoryModel from "../model/category";

export class CategoryRepository implements IcategoryRepository{
    constructor(private categoryModels:typeof categoryModel){}
   async editCategory(category: Icategory): Promise<Icategory | object> {
        const findCategory= await this.categoryModels.findById(category._id)
        if(!findCategory) return {error: "Category not found"};
        findCategory.name=category.name||findCategory.name;
        findCategory.description=category.description||findCategory.description;
        await findCategory.save()
        return findCategory;
    }
   async createCategory(category: Icategory): Promise<object> {
       const checkCategory=await this.categoryModels.findOne({name: { $regex: new RegExp("^" +category.name + "$", "i") }})
       if(checkCategory){
        return {message:'the category is already added'}
        }
        const newCategory = await this.categoryModels.create(category);
        return newCategory
    }
    async findById(categoryId:string):Promise<object>{
        const category = await this.categoryModels.findById(categoryId)
        if(!category){
            return {message:'category not found'}
        }else{
            return category
        }
    }
    async findAll():Promise<Icategory[]>{
        const categories = await this.categoryModels.find()
        return categories
    }
}