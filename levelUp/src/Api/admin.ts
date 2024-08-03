import adminRoute from '../service/endPoints/adminEndPoint'
import Api from "../service/axios"

export const adminLogin = async (email:string,password:string)=>{
try {
    const response = await Api.post(adminRoute.login,{email,password})
    console.log(response,'adf')
    console.log(response,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
    return response.data
} catch (error:any) {
    return error
}
}