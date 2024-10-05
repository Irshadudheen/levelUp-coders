
import { subjectType } from "../@types/subjectType";
import Premium from "../Usercomponents/premium";
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
export const getLevel = async (subjectId: string) => {
    try {
        const res = await Api.get(`${subjectRoutes.getLevel}?subjectId=${subjectId}`);
        return res;
    } catch (error) {
        return error;
    }
};
export const addLevel = async (level:any)=>{
    try {
        console.log(level.image,'image of upload')
        console.log(level,'level in api')
        const res = await Api.post(subjectRoutes.addLevel,{name:level.name,image:level.image,videoDescription:level.videoDescription,subjectId:level.subjectId,premium:level.premium},
            {
                headers: {
                  'Content-Type': 'multipart/form-data', // Specify the content type
                }}
        )
        return res
    } catch (error) {
        return error;
    }
}
export const getAllCategory = async()=>{
    try {
        const res = await Api.get(subjectRoutes.getAllCategory)
        return res.data
    } catch (error) {
        
    }
}
export const uploadVideo = async(data:any)=>{
    try {
        const res = await Api.post(subjectRoutes.UploadVideo,data,{
            headers:{
                'Content-Type':"multipart/from-data"
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}
export const findVideo = async (levelId: string) => {
    try {
        const res = await Api.get(`${subjectRoutes.getVideo}?levelId=${levelId}`);
        return res.data;
    } catch (error) {
        return error;
    }
}
export const addQuiz = async(options:object,questionTitle:string,question:string,levelId:string)=>{
    try {
        const res = await Api.post(subjectRoutes.addQuiz,{options,questionTitle,question,levelId})
        return res.data
    } catch (error) {
        return error
    }

}
export const getQuiz = async(levelId:string)=>{
    try {
        const res = await Api.get(`${subjectRoutes.getQuiz}?levelId=${levelId}`)
        return res.data
    } catch (error) {
        
    }
}
export const createCategory = async(category:any)=>{
    try {
        const res = await Api.post(subjectRoutes.addCategory,category)
        return res.data
    } catch (error:any) {
        console.error(error.message)
    }
}
export const getSubject= async(subjectId:string)=>{
    try {
        console.log(subjectId,'subjectId')
        const res = await Api.post(subjectRoutes.getSubject,{subjectId})
        return res.data
    } catch (error) {
        
    }
}
export  const completeLevel = async (levelId:string,userId:string)=>{
    try {
        const res = await Api.post(subjectRoutes.complete,{levelId,userId})
        return res.data
    } catch (error) {
        
    }

}
export const updateSubject = async(subjectId:string,subject:any)=>{
    try {
     const   res = await Api.put(`${subjectRoutes.updateSubject}/${subjectId}`,subject)
        return res.data
        
    } catch (error) {
        throw error
    }
}
export const actionToSubject = async (subjectId:string)=>{
    try {
        const res = await Api.patch(`${subjectRoutes.actionList}/${subjectId}`)
        return res.data
    } catch (error) {
        throw error
        
    }
}