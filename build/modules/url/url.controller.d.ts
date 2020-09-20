import { Request, Response } from "express";
declare class UrlController {
    getUrl(_req: Request, _res: Response): Promise<Response<any>>;
    setUrl(_req: Request, _res: Response): Promise<Response<any>>;
}
declare const _default: UrlController;
export default _default;
