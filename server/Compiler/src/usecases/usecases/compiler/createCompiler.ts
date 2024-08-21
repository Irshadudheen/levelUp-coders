import { Icompiler } from "../../../entities/compiler";
import { Next } from "../../../framework/types/serverPakageTypes";
import { ICompilerRepository } from "../../interface/repositoryInterface/compilerRepository";

export const createCompiler=async(compiler:Icompiler,compilerRepository:ICompilerRepository,next:Next):Promise<Icompiler|void>=>{
    try {
        return compilerRepository.createCompiler(compiler)
        
    } catch (error) {
        
    }
}