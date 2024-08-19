import { Router, Response, Request, NextFunction, Express } from 'express';
import { File as MulterFile } from 'multer';

export type Res = Response;
export type Next = NextFunction;
export type serverPackage = Express;
export type Route = Router;

export interface Req extends Request {
    file?: MulterFile;
}
