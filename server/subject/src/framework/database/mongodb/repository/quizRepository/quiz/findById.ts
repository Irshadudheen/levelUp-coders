import quizModel from "../../../model/quiz"

export const findById = async(levelId:string,quizModels:typeof quizModel)=>{
    try {
        console.log(levelId,'levelId')
    const quiz =await quizModels.find({levelId})  
    return quiz     
    } catch (error:any) {
        throw error
    }
}
