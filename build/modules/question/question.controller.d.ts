import { Request, Response } from "express";
declare class QuestionController {
    list(_req: Request, _res: Response): Promise<Response<any>>;
    listAll(_req: Request, _res: Response): Promise<Response<any>>;
    delete(_req: Request, _res: Response): Promise<Response<any>>;
    create(_req: Request, _res: Response): Promise<Response<any>>;
    select(_req: Request, _res: Response): Promise<Response<any>>;
    update(_req: Request, _res: Response): Promise<Response<any>>;
    rate(_req: Request, _res: Response): Promise<Response<any>>;
    getRate(_req: Request, _res: Response): Promise<Response<any>>;
}
declare const _default: QuestionController;
export default _default;
