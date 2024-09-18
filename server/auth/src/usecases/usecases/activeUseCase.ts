import { Iactive } from "../../entities/activeDays";
import { Next } from "../../framework/types/serverPakageTypes";
import { IactiveRepository } from "../interface/repositoryInterface/activeRepository";
import { IactiveUsecase } from "../interface/usecase/activeUsecase";

export class ActiveUseCase implements IactiveUsecase{
    constructor(
        private activeRepository:IactiveRepository,
        
    ){}
    // async createActiveDays(active: Iactive, next: Next): Promise<Iactive> {
    //     return await this.activeRepository.createActiveDays(active)
    // }
    async update(userId: string, next: Next): Promise<Iactive | void | null> {
        return await this.activeRepository.update(userId)
    }
    async find(userId: string, next: Next): Promise<Iactive | void | null> {
        return await this.activeRepository.find(userId)
    }

}