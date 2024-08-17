
import Premium from "../pages/user/premium";
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
        const res = await Api.post(subjectRoutes.addLevel,{name:level.name,image:level.image,videoDescription:level.videoDescription,subjectId:level.subjectId,video:'the video'},
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