import { Iquiz } from "../../../entities/quiz";

export interface IquizRepository{
    createQuiz(quiz:Iquiz):Promise <Iquiz|void>
    findByLevelId(levelId:string):Promise<Iquiz|void|null>
}