import { Iquiz } from "../../../entities/quiz"
import { Next } from "../../../framework/types/serverPakageTypes"
import { IquizRepository } from "../../interface/repositoryInterface/quizRepository"

export const addQuiz = async(quiz:Iquiz,quizRepository:IquizRepository,next:Next)=>{
    try {
        return await quizRepository.createQuiz(quiz)
    } catch (error:any) {
        console.log(error.message)
    }
}


