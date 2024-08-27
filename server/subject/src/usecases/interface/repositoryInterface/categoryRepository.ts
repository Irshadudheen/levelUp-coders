import { Icategory } from "../../../entities/category";

export interface IcategoryRepository{
    createCategory(category:Icategory):Promise<object>
    findAll():Promise<Icategory[]>
    findById(id:string):Promise<Icategory|object>
    editCategory(category:Icategory):Promise<Icategory|object>
}