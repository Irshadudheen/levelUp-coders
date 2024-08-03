import { Iadmin } from "../../entities/admin";
import { Next } from "../../framework/types/serverPakageTypes";
import { IadminRepository } from "../interface/repositoryInterface/adminRepository";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { IhashPassword } from "../interface/service/hashPassword";
import { Ijwt } from "../interface/service/jwt";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IadminUseCase } from "../interface/usecase/adminUseCase";
import { catchError } from "../middlewares/catchError";
import ErrorHandler from "../middlewares/errorHandler";
import { adminLogin } from "./admin/adminLogin";
export class AdminUseCase implements IadminUseCase{
    constructor(
        private adminRepository:IadminRepository,
        private hashpassword:IhashPassword,
        private jwt:Ijwt,
        
    ){}

    async adminLogin(email:string,password:string,next:Next){
        try {
            return await adminLogin(email,password,this.hashpassword,this.adminRepository,this.jwt,next)
            
        } catch (error) {
           catchError(error,next)
        }
    }
}