import { Next, Req, Res } from "../framework/types/serverPakageTypes";
import { IadminUseCase } from "../usecases/interface/usecase/adminUseCase";
import ErrorHandler from "../usecases/middlewares/errorHandler";
import { accessTokenOptions, refreshTokenOptions } from "../framework/webServer/middleware/Tokens";
export class AdminController {
    constructor(private adminUseCase: IadminUseCase) { }

    async adminLogin(req: Req, res: Res, next: Next) {
        try {
            const admin: any = await this.adminUseCase.adminLogin(req.body.email, req.body.password, next)
            console.log(admin, 'admin controller')
            if (admin) {
                console.log(admin.token, 'admin token')

                res.cookie('accesToken', admin.token.accessToken, accessTokenOptions)
                res.send(admin)
            }
        } catch (error: any) {
            next(new ErrorHandler(error.status, error.message))
        }
    }
    async logout(req: Req, res: Res, next: Next) {
        try {
            res.clearCookie('accessToken', accessTokenOptions)
            res.clearCookie('refreshToken', refreshTokenOptions)
            res.status(200).json({ succuss: true, message: 'logout success' })
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))

        }
    }
    async getUserData(req: Req, res: Res, next: Next) {
        try {
            const users = await this.adminUseCase.getUserData(next)
            if (users) {
                res.json(users).status(201)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }
    async blockUser(req: Req, res: Res, next: Next) {
        try {
            const user = await this.adminUseCase.blockUser(req.body.userId, next)
            console.log(user)
            if (user) {
                res.json({ message: 'the blocked User', succus: true })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }
}