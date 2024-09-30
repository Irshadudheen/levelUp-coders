import { Req, Res, Next } from "../../framework/types/serverPakageTypes";
import { IuserUseCase } from "../interface/usecase/userUseCase";
import { Iuser } from "../../entities/user";
import { userSignup, createUser, login, forgotPassword, emailVerify, updateUserPassword, googleLogin, editProfile } from './user/index'
import { Ijwt, IToken } from "../interface/service/jwt";
import { catchError } from "../middlewares/catchError";
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IhashPassword } from "../interface/service/hashPassword";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { IsentEmail } from "../interface/service/sentEmail";
import { Iactive } from "../../entities/activeDays";
import { IactiveRepository } from "../interface/repositoryInterface/activeRepository";
export class UserUseCase implements IuserUseCase {
    constructor(
        private userRepository: IuserRepository,
        private jwt: Ijwt,
        private otpGenerate: IotpGenerate,
        private otpRepository: IotpRepository,
        private sentEmail: IsentEmail,
        private hashPassword: IhashPassword,
        // private activeRepository:IactiveRepository
    ) { }
    // async createActiveDays(userId:Iactive, next: Next): Promise<Iactive | void | null> {
    //     return await createActiveDays(userId,this.activeRepository,next)
    // }
    async editUserProfile(name: string, userId: string, next: Next): Promise<Iuser | void | null> {
        return await editProfile(name, userId, this.userRepository, next);
    }
    async userSignup(user: Iuser, next: Next): Promise<string | void> {
        try {
            console.log('coming in userSignup in userUseCase')
            let toke = await userSignup(
                this.jwt,
                this.otpRepository,
                this.userRepository,
                this.otpGenerate,
                this.hashPassword,
                user,
                this.sentEmail, next
            )
            console.log('the toke', toke)
            return toke
        } catch (error) {
            console.log("error userSignup in userUsecase")
            catchError(error, next)

        }
    }
    async createUser(token: string, otp: string, next: Next): Promise<Iuser | void> {
        try {
            const user = await createUser(
                token,
                otp,
                this.otpRepository,
                this.userRepository,
                this.hashPassword,
                this.jwt,
                next)
            console.log("in the usecase", user)
            return user
        } catch (error) {
            catchError(error, next)
        }
    }
    async login(email: string, password: string, next: Next): Promise<any | void> {
        try {
            return await login(this.userRepository, this.jwt, this.hashPassword, email, password, next)
        } catch (error) {
            catchError(error, next)

        }
    }
    async forgotPasswordRemainder(email: string, next: Next): Promise<object | void> {
        try {

            return await forgotPassword(this.sentEmail, this.otpRepository, this.otpGenerate, this.userRepository, email, next)
        } catch (error) {
            catchError(error, next)
        }
    }
    async emailVerify(email: string, otp: string, next: Next): Promise<object | void> {
        try {
            return await emailVerify(this.otpRepository, this.userRepository, email, otp, next)
        } catch (error) {
            catchError(error, next)
        }
    }
    async updatePassword(email: string, passsword: string, next: Next): Promise<object | void> {
        try {
            return await updateUserPassword(this.userRepository, this.hashPassword, email, passsword, next)

        } catch (error) {
            catchError(error, next)
        }
    }
    async googleLogin(name: string, email: string, passsword: string, next: Next): Promise<object | void> {
        try {
            return await googleLogin(this.userRepository, this.hashPassword, this.jwt, name, email, passsword, next)
        } catch (error) {
            catchError(error, next)
        }
    }
}   