import { Icompiler } from "../../../entities/compiler";
import { Next } from "../../../framework/types/serverPakageTypes";

export interface IcompilerUseCase{
    createCompiler(compiler:Icompiler,next:Next):Promise<Icompiler|void>
    getCompiler(levelId:string,next:Next):Promise<Icompiler|void|null>
}