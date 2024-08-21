import compilerModel from "../../model/compiler";

export const findByLevelIdCompiler=async(levelId:string,compilerModels:typeof compilerModel)=>{
    try {
        return await compilerModels.findOne({levelId})
    } catch (error) {
        throw error
    }
}