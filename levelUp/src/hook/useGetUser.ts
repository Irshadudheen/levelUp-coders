import { useSelector } from "react-redux";
import { currentUser } from "../@types/currentUser";
const useGetUser = ()=>{
    const user = useSelector((state)=>state)
    console.log(user)
    return user
}
export default useGetUser