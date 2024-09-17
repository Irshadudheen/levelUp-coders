import ErrorHandler from "../../../../../../usecases/middlewares/errorHandler";
import userModel from "../../../model/userModel";

export const block= async(id:string,userModels:typeof userModel)=>{
    try {
        const user = await userModels.findById(id)
        if(user){
            user.blocked=!user.blocked
           const res= await user.save()
           return res
        }else{
            console.log('user not found')
        }
    } catch (error:any) {
        throw error
    }
}