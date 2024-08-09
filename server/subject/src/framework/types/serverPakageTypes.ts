import {Router,Response,Request,NextFunction,Express} from 'express'

export type Res =Response;
export type Next =NextFunction;
export type serverPakage =Express;
export type Route =Router;
interface File {
    path?:string;
    filename?:string;
    mimetype?:string;
    size?:number;
}
export interface Req extends Request{
    file?:File
}