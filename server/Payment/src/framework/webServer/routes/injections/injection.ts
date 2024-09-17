
import {UserUseCase} from '../../../../usecases/usecases/userUseCase'





import { UserRepository } from "../../../database/mongodb/repository/userRepository/userRepository";
import userModel from "../../../database/mongodb/model/userModel";
import { PaymentController } from '../../../../controller/payment';
import { PaymentUseCase } from '../../../../usecases/usecases/paymentUsecase';
import { PaymentRepository } from '../../../database/mongodb/repository/paymentRepository';
import subscriptionModel from '../../../database/mongodb/model/paymentModel';

const paymentRepository = new PaymentRepository(subscriptionModel)
const paymentUseCase = new PaymentUseCase(paymentRepository)
const paymentController = new PaymentController(paymentUseCase)
const userrepository = new UserRepository(userModel)

const userusecase = new UserUseCase(userrepository)

export {userusecase,paymentController}