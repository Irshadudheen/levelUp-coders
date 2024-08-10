import adminRoute from '../service/endPoints/adminEndPoint'
import Api from "../service/axios"

export const adminLogin = async (email:string,password:string)=>{
try {
    const response = await Api.post(adminRoute.login,{email,password})
    console.log(response,'adf')
   
    return response.data
} catch (error:any) {
    return error
}
}
export const logout = async ()=>{
    try {
        const response = await Api.post(adminRoute.logout)
        return response.data
    } catch (error:any) {
        return error
    }
}
export const addSubject = async (subject:any)=>{
    try {
       const response = await Api.post(adminRoute.addSubject,subject,{
        headers: {
          'Content-Type': 'multipart/form-data', // Specify the content type
        }}) 
       return response
    } catch (error) {
        
    }
}