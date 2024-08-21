import { Next } from "../../../framework/types/serverPakageTypes";
import { ICompilerRepository } from "../../interface/repositoryInterface/compilerRepository";

export const findCompiler = async (levelId:string,compilerRepository:ICompilerRepository,next:Next)=>{
    try {
        return await  compilerRepository.getCompiler(levelId);

    } catch (error) {
        
    }
}