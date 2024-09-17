import Api from "../service/axios";
import paymentRoute from "../service/endPoints/paymentEndPoint";

export const paymentSuccess = async(sessionId:string,clientId:string,paymentType:object)=>{
    try {
        const response = await Api.post(`${paymentRoute.success}/${sessionId}`,{clientId,paymentType})
        return response.data;
    } catch (error) {
        return error
    }
}