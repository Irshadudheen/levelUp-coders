import { Isubject } from "../../entities/subject";
import { Next } from "../../framework/types/serverPakageTypes";

export interface IsubjectUseCase{
    addSubject(subject:Isubject,next:Next):Promise<Isubject|void>
}