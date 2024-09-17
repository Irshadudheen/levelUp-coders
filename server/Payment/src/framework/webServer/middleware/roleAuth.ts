import { Next, Req, Res } from "../../types/serverPakageTypes";
import { isAuthenticate } from "./auth";

export const isUser = (req: Req, res: Res, next: Next) => {
    try {
        // console.log(req.headers)
        // const role = req.headers['x-verify-token'] as string;
        // console.log('role of req', role)
        // if (role == 'user') {
            // console.log(req.cookies,'the user logout')
            isAuthenticate(req,res,next)
            // next()
        // // } else {
        //     console.log('no role error')
        //     res.json({ message: 'inValid Access !!! Login again', succuss: false }).status(401)
        // }
    } catch (error) {
        throw error
    }
}
export const isAdmin = (req: Req, res: Res, next: Next) => {
    try {
        isAuthenticate(req,res,next)
        // const role = req.headers['x-user-role'] as string;
        // console.log('role of req', role);
        // if (role == 'admin') {
        //     console.log('ready for admin')
        //     next()
        // } else {
        //     console.log("no role err")
        //     res.json({ message: 'inValid Access admin !!! Login again', succuss: false }).status(401)
        // }
    } catch (error) {
        throw error
    }
}