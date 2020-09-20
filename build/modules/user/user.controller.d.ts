import { Request, Response } from 'express';
declare class UserController {
    me(_req: Request, _res: Response): Promise<Response<any>>;
    list(_req: Request, _res: Response): Promise<Response<any>>;
    getOne(_req: Request, _res: Response): Promise<Response<any>>;
    getLead(_req: Request, _res: Response): Promise<Response<any>>;
    update(_req: Request, _res: Response): Promise<Response<any>>;
    delete(_req: Request, _res: Response): Promise<Response<any>>;
    deleteAll(_req: Request, _res: Response): Promise<Response<any>>;
    create(_req: Request, _res: Response): Promise<Response<any>>;
    lead(_req: Request, _res: Response): Promise<Response<any>>;
}
declare const _default: UserController;
export default _default;
