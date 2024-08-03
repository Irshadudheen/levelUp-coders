import { Next } from "../../framework/types/serverPakageTypes";

export interface IsubjectUseCase{
    addSubject(subject:Isubject,next:Next):Promise<string|void>
}