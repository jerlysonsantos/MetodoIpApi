import { Request, Response } from 'express';
import { BaseEntity } from 'typeorm';
declare const _default: <T extends BaseEntity>(req: Request, res: Response, entity: [T[], number]) => Response<any>;
export default _default;
