import { Icategory } from "../../../entities/category";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IcategoryUseCase{
    createCategory(category: Icategory,next:Next): Promise<Icategory|object>;
    getCategories(next:Next): Promise<Icategory[]>;
    getCategoryById(id: string,next:Next): Promise<Icategory|object>;
    updateCategory(category: Icategory,next:Next): Promise<Icategory>;
    blockCategory(id: string,next:Next): Promise<void>;
    unblockCategory(id: string,next:Next): Promise<void>;

}