import { Next } from "../../../framework/types/serverPakageTypes";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { Ijwt } from "../../interface/service/jwt";

export const adminLogin=async(email:string,password:string,hashPassword:IhashPassword,adminRepository:IadminRepository,jwt:Ijwt,next:Next)=>{
try {
    
    const admin = await adminRepository.findAdmin(email);
    if(!admin) return {message:'Admin not found!'}
    
    const compare = await hashPassword.compareHashPassword(password,admin.password)
    if(!compare) return {message:'Password is incorrect!'}
    const id= admin._id
    const token:any = await jwt.createAccessAndRefreashToken(id as string)
    token.role='admin'
    console.log('token created ',token)
    return {admin,token}
} catch (error) {
    throw error
}
}