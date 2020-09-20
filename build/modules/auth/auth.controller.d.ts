import { Request, Response } from 'express';
declare class AuthController {
    login(_req: Request, _res: Response): Promise<Response<any>>;
    getAllUsers(_req: Request, _res: Response): Promise<Response<any>>;
    checkToken(_req: Request, _res: Response): Promise<Response<any>>;
    delete(_req: Request, _res: Response): Promise<Response<any>>;
}
declare const _default: AuthController;
export default _default;
