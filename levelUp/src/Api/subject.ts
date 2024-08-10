
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