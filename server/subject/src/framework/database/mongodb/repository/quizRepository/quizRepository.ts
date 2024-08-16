import { Iquiz } from "../../../../../entities/quiz";
import { IquizRepository } from "../../../../../usecases/interface/repositoryInterface/quizRepository";
import quizModel from "../../model/quiz";
import { createQuiz, findById } from "./quiz/index";
export class QuizRepository implements IquizRepository{
    constructor(private quizModels:typeof quizModel){}
    async findByLevelId(levelId: string): Promise<Iquiz | void|null> {
        try {
            return await findById(levelId,this.quizModels)
        } catch (error) {
            throw error
        }
    }
    async createQuiz(quiz:Iquiz):Promise<Iquiz|void>{
        try {
            return await createQuiz(quiz,this.quizModels)
        } catch (error) {
            throw error
        }
    }
}