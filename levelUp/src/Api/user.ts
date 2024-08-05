import { loginData } from "../@types/loginType";
import { userFormData } from "../@types/user";
import Api from "../service/axios";
import userRoutes from "../service/endPoints/userEndPoint";

export const signup =async (userData:userFormData)=>{
    try {
        console.log(userData)
        console.log(userRoutes.signup)
        const response = await Api.post(userRoutes.signup,userData)
        
        return response.data
    } catch (error:any) {
        return error
    }
}
export const otpVerify = async (otp: string,email:string) => {
    try {
      
        const response = await Api.post(userRoutes.verifyOTP, {otp,email})
        console.log('-------------------------------------------------------------------------------------------------------------')
        console.log(" after that api call ", response)
        return response.data
    } catch (error:any) {
        return error
    }
}
export const login = async (loginData:loginData)=>{
    try {
        
        const response = await Api.post(userRoutes.login,loginData)
        console.log("after the login")
        
        return response.data
    } catch (error:any) {
    
        return error
    }
}
export const forgotPassword = async(email:string)=>{
    try {
        
        const response = await Api.post(userRoutes.forgotPassword,{email})
        return response.data
    } catch (error) {
        return error
    }
}
export const userGoogleLogin = async (loginData:object)=>{
    try {
        const response = await Api.post(userRoutes.googleLogin,loginData)
        return response.data
    } catch (error:any) {
        return error
    }
}
export const logout = async ()=>{
    try {
        const response = await Api.post(userRoutes.logout)
        return response.data
    } catch (error:any) {
        return error
    }
}
export const newPassword = async (password:string)=>{
    try {
        const response = await Api.patch(userRoutes.newPassword,password)
        return response.data
    } catch (error:any) {
        return error
        
    }
}
export const verifyEmail = async (email:string,otp:string)=>{
    try {
        const response = await Api.post(userRoutes.verifyEmail,{email,otp})
        return response.data
    } catch (error) {
        return error
    }
}