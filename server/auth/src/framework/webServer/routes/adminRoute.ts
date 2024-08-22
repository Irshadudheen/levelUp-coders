import { Next,Req,Res,Route } from "../../types/serverPakageTypes";
import { isAdmin } from "../middleware/roleAuth";
import { adminController } from "./injections/injection";

export function adminRouter(router:Route){
        router.post('/login',(req:Req,res:Res,next:Next)=>{
            adminController.adminLogin(req,res,next)
        })
        router.post('/logout',(req:Req,res:Res,next:Next)=>{
            adminController.logout(req,res,next);
        })
        router.get('/userData',(req:Req,res:Res,next:Next)=>{
            adminController.getUserData(req,res,next);
        })
        router.post('/blockUser',(req:Req,res:Res,next:Next)=>{
            adminController.blockUser(req,res,next);
        })
}