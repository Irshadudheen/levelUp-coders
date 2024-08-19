import userModel from "../../../model/userModel";

export const editProfile = async (name:string,userId:string,userModels:typeof userModel)=>{
    try {
        await userModels.findByIdAndUpdate(userId,{name},{new:true})
        return userModels.findById(userId)
    } catch (error) {
        
    }
}