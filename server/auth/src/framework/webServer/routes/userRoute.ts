import {Next,Req,Res,Route} from '../../types/serverPakageTypes'
import {activeController, userController} from './injections/injection'
import { isUser } from '../middleware/roleAuth'
export function UserRoute(router:Route){
    
    router.post('/register',async (req:Req,res:Res,next:Next)=>{
    console.log("coming in register")
    userController.signup(req,res,next);
    })
    router.post('/createUser',async (req:Req,res:Res,next:Next)=>{
        console.log("coming in create user",req.body)
        userController.createUser(req, res, next)
    })
    router.post('/login',async (req:Req,res:Res,next:Next)=>{
        console.log('comming in Login',req.body)
        userController.login(req,res,next)
    })
    router.post('/forgotPassword',async (req:Req,res:Res,next)=>{
        console.log('comming in forgot password',req.body)
        userController.forgotPassword(req,res,next)
    })
    router.post('/createNewPassword',async (req:Req,res:Res,next:Next)=>{
        console.log('comming in createNew password')
        userController.createNewPassword(req,res,next)
    })
    router.patch('/newPassword',async (req:Req,res:Res,next:Next)=>{
        console.log('comming in new password')
        userController.addNewPassword(req,res,next)
    })
    router.post('/googleLogin',async(req:Req,res:Res,next:Next)=>{
        console.log('comming in google login')
        userController.googleLogin(req,res,next);
    })
    router.post('/logout',isUser, async(req:Req,res:Res,next:Next)=>{
        console.log('comming into logout')
        userController.logout(req,res,next);
    })
    router.patch('/updateProfile',isUser,async(req:Req,res:Res,next:Next)=>{
        console.log('comming into update profile')
        userController.updateProfile(req,res,next)
    })
    router.post('/activeDaysUpdate',isUser,(req:Req,res:Res,next:Next)=>{
        activeController.updateActiveDays(req,res,next)
    })
    router.post('/findActiveDays',isUser,(req:Req,res:Res,next:Next)=>{
        activeController.findActiveDays(req,res,next)
    })
}