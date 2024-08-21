import { Icompiler } from "../../../../entities/compiler";
import { ICompilerRepository } from "../../../../usecases/interface/repositoryInterface/compilerRepository";
import compilerModel from "../model/compiler";
import { createCompiler, findByLevelIdCompiler } from "./compiler/index";

export class CompilerRepository implements ICompilerRepository{
    constructor(private compilerModels:typeof compilerModel){}
 async   createCompiler(compiler: Icompiler): Promise<Icompiler> {
       return await createCompiler(compiler,this.compilerModels)
    }
  async  getCompiler(levelId: string): Promise<Icompiler|void|null> {
        return await findByLevelIdCompiler(levelId,this.compilerModels)
    }
    
}