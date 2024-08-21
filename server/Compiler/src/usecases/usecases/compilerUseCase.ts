import { Icompiler } from "../../entities/compiler";
import { Next } from "../../framework/types/serverPakageTypes";
import { ICompilerRepository } from "../interface/repositoryInterface/compilerRepository";
import { IcompilerUseCase } from "../interface/usecase/compilerUseCase";
import { createCompiler, findCompiler } from "./compiler/index";

export class CompilerUsecase implements IcompilerUseCase{
    constructor(private compilerRepository:ICompilerRepository){}
    async createCompiler(compiler: Icompiler, next: Next): Promise<Icompiler|void> {
       return await createCompiler(compiler,this.compilerRepository,next)
    }
    async getCompiler(levelId: string, next: Next): Promise<Icompiler|void|null> {
       return await findCompiler(levelId,this.compilerRepository,next)
    }
   
}