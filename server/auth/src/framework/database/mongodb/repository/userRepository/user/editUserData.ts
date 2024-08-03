import { Model, Document } from "mongoose"
import { Iuser } from "../../../../../../entities/user"
import userModel from "../../../model/userModel"


export const editUserData = async (userModels: Model<Iuser, {}, {}, {}, Document<unknown, {}, Iuser> & Iuser & Required<{ _id: string }>, any>, id: string, phoneNumber: string, name: string):Promise<Iuser | undefined>=>{
    try{
        const user = await userModel.findByIdAndUpdate(id,{phoneNumber:phoneNumber,name:name})
          console.log("userData",user)
        return user ? user : undefined
    }catch(error){
        throw error
    }
}