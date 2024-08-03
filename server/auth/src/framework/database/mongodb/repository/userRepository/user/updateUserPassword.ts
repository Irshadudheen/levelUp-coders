import userModel from "../../../model/userModel";

export const updateUserPassword = async (userModels:typeof userModel,email:string,password:string)=>{
    const res = await userModel.findOneAndUpdate({email},{$set:{password}})
    return res
}