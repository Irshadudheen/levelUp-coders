import Api from "../service/axios";
import interviewRoute from "../service/endPoints/interviewEndPont";

export const createRomm = async ()=>{
    try {
        const res = await Api.post(interviewRoute.createRoom)
        return res.data
    } catch (error) {
        throw error
    }
}
export const sendCode =async (code:string,language:string)=>{
try {
    const res = await Api.post(interviewRoute.runCode,{code,language})  
    return res.data  
} catch (error) {
    throw error
}
}
export const validateRoom = async (roomId:string)=>{
    try {
        const res = await Api.get(`${interviewRoute.validateRoom}/${roomId}`)
        return res.data
        
    } catch (error) {
        throw error
    }
}