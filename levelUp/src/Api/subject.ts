import { subject } from "../@types/subjectType";
import Api from "../service/axios";
import subjectRoutes from "../service/endPoints/subjectEndPoint";

export const getAllSubject = async ()=>{
    try {
       const res = await Api.post(subjectRoutes.getAllSubject)
        return res
    } catch (error) {
        return error
    }
}