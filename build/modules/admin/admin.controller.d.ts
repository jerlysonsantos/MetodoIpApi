import { Request, Response } from "express";
declare class AdminController {
    index(_req: Request, _res: Response): Promise<Response<any>>;
    create(_req: Request, _res: Response): Promise<Response<any>>;
    update(_req: Request, _res: Response): Promise<Response<any>>;
    delete(_req: Request, _res: Response): Promise<Response<any>>;
    login(_req: Request, _res: Response): Promise<Response<any>>;
}
declare const _default: AdminController;
export default _default;
