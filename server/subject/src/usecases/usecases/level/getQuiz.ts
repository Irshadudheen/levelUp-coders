import { Next } from "../../../framework/types/serverPakageTypes";
import { IquizRepository } from "../../interface/repositoryInterface/quizRepository";

export const getQuiz = async (levelId:string,quizRepository:IquizRepository,next:Next)=>{
try {
    return await quizRepository.findByLevelId(levelId)
} catch (error) {
    throw error
}
}