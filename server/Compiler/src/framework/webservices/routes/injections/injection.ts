import { CompilerController } from "../../../../controller/compiler";
import { CompilerUsecase } from "../../../../usecases/usecases/compilerUseCase";
import compilerModel from "../../../database/mongodb/model/compiler";
import { CompilerRepository } from "../../../database/mongodb/repository/CompilerRepository";

const compilerRepository= new CompilerRepository(compilerModel)
const compilerUseCase= new CompilerUsecase(compilerRepository)
const compilerController = new CompilerController(compilerUseCase)

export {compilerController}
