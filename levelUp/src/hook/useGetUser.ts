import { useSelector } from "react-redux";
import { currentUser } from "../@types/currentUser";
const useGetUser = ()=>{
    const user = useSelector((state:currentUser)=>state.role)
    console.log(user)
    return user
}
export default useGetUser