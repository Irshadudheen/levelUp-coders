import { useSelector } from "react-redux";
import { currentUser } from "../@types/currentUser";
const useGetAdmin = () => {
    const admin = useSelector((state: currentUser) => state.role == 'admin')
    console.log(admin)
    return admin
}
export default useGetAdmin