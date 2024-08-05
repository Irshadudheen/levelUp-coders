import { Next,Req,Res,Route } from "../../types/serverPakageTypes";
import { adminController } from "./injections/injection";

export function adminRouter(router:Route){
        router.post('/login',(req:Req,res:Res,next:Next)=>{
            adminController.adminLogin(req,res,next)
        })
        router.post('/logout',(req:Req,res:Res,next:Next)=>{
            adminController.logout(req,res,next);
        })
}