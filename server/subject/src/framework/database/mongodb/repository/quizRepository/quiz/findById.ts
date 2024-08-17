import quizModel from "../../../model/quiz"

export const findById = async(levelId:string,quizModels:typeof quizModel)=>{
    try {
        console.log(levelId,'levelId')
    const quiz =await quizModels.findOne({levelId})  
    return quiz     
    } catch (error:any) {
        throw error
    }
}
