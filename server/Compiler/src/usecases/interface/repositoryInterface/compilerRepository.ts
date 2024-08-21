import { Icompiler } from "../../../entities/compiler";

export interface ICompilerRepository{
    createCompiler(compiler:Icompiler):Promise<Icompiler>
    getCompiler(levelId:string):Promise<Icompiler|void|null>

}