import quizModel from "../../../model/quiz"

export const findById = async(levelId:string,quizModels:typeof quizModel)=>{
    try {
    const quiz =await quizModels.findOne({levelId})  
    return quiz     
    } catch (error:any) {
        throw error
    }
}
