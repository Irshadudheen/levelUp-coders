import {UserController} from '../../../../controller/userController'
import {UserUseCase} from '../../../../usecases/usecases/userUseCase'
import { AdminController } from '../../../../controller/adminController';
import { AdminUseCase } from '../../../../usecases/usecases/adminUseCase';
import { Encrypt } from "../../../services/hashPassword";
import { SentEmail } from "../../../services/sendEmail";
import { OtpRepository } from "../../../database/mongodb/repository/otpRepository"
import { OtpGenerate } from "../../../services/otpGenerator";
import { JWTtoken } from "../../../services/jwt";
import { UserRepository } from "../../../database/mongodb/repository/userRepository/userRepository";
import userModel from "../../../database/mongodb/model/userModel";
import { AdminRepository } from '../../../database/mongodb/repository/adminRepository/adminRepository';
import adminModel from '../../../database/mongodb/model/admin';
import { ActiveRepository } from '../../../database/mongodb/repository/activeRepository';
import activeModel from '../../../database/mongodb/model/activeDays';
import { ActiveUseCase } from '../../../../usecases/usecases/activeUseCase';
import { ActiveController } from '../../../../controller/activeController';


const bycryptsurvice =new  Encrypt()
const sentemail = new SentEmail()
const otprepository = new OtpRepository()
const otpGenerate = new OtpGenerate()
const jwttoken = new JWTtoken()
const activeRepository= new ActiveRepository(activeModel)
const userrepository = new UserRepository(userModel)
const adminRepository = new AdminRepository(adminModel)
const activeUseCase = new ActiveUseCase(activeRepository)
const userusecase = new UserUseCase(userrepository,jwttoken,otpGenerate,otprepository,sentemail,bycryptsurvice)
const  userController = new UserController(userusecase)
const adminusecase = new AdminUseCase(adminRepository,bycryptsurvice,jwttoken,userrepository)
const adminController = new AdminController(adminusecase)
const activeController = new ActiveController(activeUseCase)
export {userController,adminController,activeController}