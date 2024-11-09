import { Req, Res, Next } from "../framework/types/serverPakageTypes";
import { IuserUseCase } from '../usecases/interface/usecase/userUseCase'
import { accessTokenOptions, refreshTokenOptions } from "../framework/webServer/middleware/Tokens";
import ErrorHandler from "../usecases/middlewares/errorHandler";
import { sendSignupData } from "../framework/services/messageBroker/producer";


export class UserController {
    private userUseCase: IuserUseCase
    constructor(userUseCase: IuserUseCase) {
        this.userUseCase = userUseCase
    }
    async signup(req: Req, res: Res, next: Next) {
        try {
            console.log("hai")
            console.log(req.body)
            const { name, email, password } = req.body

            const Token = await this.userUseCase.userSignup({ name, email, password }, next)
            if (Token) {
                res.cookie('verificationToken', Token, {
                    httpOnly: true,
                    sameSite: 'none',
                    expires: new Date(Date.now() + 300 * 60 * 1000)
                })
                res.status(200).json({
                    succes: true,
                    message: 'verification otp has been send to the Email',
                    verifyToken: Token
                })
            }
        } catch (error: any) {

            return next(new ErrorHandler(error.status, error.message))
        }
    }
    async createUser(req: Req, res: Res, next: Next) {
        try {
            console.log("create controller in user")
            const token = req.headers['x-verify-token']
            console.log(token)
            if (typeof token !== 'string') {
                throw new ErrorHandler(400, 'Invalid token');
            }
            const user = await this.userUseCase.createUser(token as string, req.body.otp, next)
            console.log("at the end of the uer", user)
            if (user) {
                await sendSignupData(user)
                // const active = await this.userUseCase.createActiveDays({userId:user._id,days:[{data:,isActive:true}]})
                res.clearCookie("verificationToken").send(user)
            }
        } catch (error: any) {
            console.log("comiiing here the error")
            return next(new ErrorHandler(error.status, error.message))
        }
    }
    async login(req: Req, res: Res, next: Next) {
        try {
            console.log(req.body, 'user login')
            const user = await this.userUseCase.login(req.body.email, req.body.password, next)
            console.log(user, 'user in controller')

            if (user) {
                console.log(user.token, 'user token')
                console.log(accessTokenOptions, 'the access token option')
                res.cookie('accesToken', {accessToken:user.token.accessToken, accessTokenOptions:accessTokenOptions}, {
                    httpOnly: true,
                    sameSite: 'none',
                    expires: new Date(Date.now() + 300 * 60 * 1000)
                })
                res.json(user)

            }
        } catch (error: any) {
            console.log('comming in login err')
        }
    }
    async forgotPassword(req: Req, res: Res, next: Next) {
        try {
            const result = await this.userUseCase.forgotPasswordRemainder(req.body.email, next)
            if (result) {
                console.log(result)
                res.send(result).status(201)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }
    async createNewPassword(req: Req, res: Res, next: Next) {
        try {

            const result = await this.userUseCase.emailVerify(req.body.email, req.body.otp, next)
            if (result) {
                console.log(result)
                res.send(result).status(201)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }

    }
    async addNewPassword(req: Req, res: Res, next: Next) {
        try {
            console.log('new passsword controller', req.body)
            const result = await this.userUseCase.updatePassword(req.body.email, req.body.password, next)
            if (result) {
                res.send(result).status(200)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }
    async googleLogin(req: Req, res: Res, next: Next) {
        try {
            console.log('google login in controller', req.body)
            const user: any = await this.userUseCase.googleLogin(req.body.name, req.body.email, req.body.password, next)
            console.log(user, 'the user afther creation in controller google')
            if (user) {
                console.log(user.token, 'user token')

                res.cookie('accesToken', user.token.accessToken, accessTokenOptions)
                res.send(user)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
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
    async updateProfile(req: Req, res: Res, next: Next) {
        try {
            const { name, userId } = req.body
            const user = await this.userUseCase.editUserProfile(name, userId, next)
            if (user) {
                res.json({ ...user, succuss: true }).status(201)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }

}