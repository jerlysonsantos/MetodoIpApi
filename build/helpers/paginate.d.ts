import { Request } from "express";
export declare const DEFAULT_PERPAGE = 100;
declare const _default: (req: Request) => {
    skip: number;
    take: number;
};
export default _default;
