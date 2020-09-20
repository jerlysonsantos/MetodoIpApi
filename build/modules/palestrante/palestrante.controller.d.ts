import { Request, Response } from "express";
declare class PalestranteController {
    list(_req: Request, _res: Response): Promise<Response<any>>;
    delete(_req: Request, _res: Response): Promise<Response<any>>;
    create(_req: Request, _res: Response): Promise<Response<any>>;
    update(_req: Request, _res: Response): Promise<Response<any>>;
}
declare const _default: PalestranteController;
export default _default;
