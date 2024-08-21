import { Icompiler } from "../../../../../entities/compiler";
import compilerModel from "../../model/compiler";

export const createCompiler=async(compiler:Icompiler,compilerModels:typeof compilerModel)=>{
            try {
                const findCompiler= await compilerModel.findOne({levelId:compiler.levelId})
                if(!findCompiler){

                    return await compilerModels.create(compiler)
                }
                return findCompiler
            } catch (error) {
                throw error
            }
}