import { Iquiz } from "../../../../../../entities/quiz"
import quizModel from "../../../model/quiz"

export const createQuiz = async (quiz:Iquiz,quizModels:typeof quizModel):Promise<Iquiz>=>{
    return await quizModels.create(quiz)
}
