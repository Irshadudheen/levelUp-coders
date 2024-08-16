import subjectModel from "../../../model/subject";

export const findById=async (productId:string,subjectModels:typeof subjectModel)=>{
    try {
      const  subject =await subjectModels.findById(productId)
      if(subject){
        return subject
      }
    } catch (error:any) {
        throw error
    }
}