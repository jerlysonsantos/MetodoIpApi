import { Response } from 'express';
declare const ErrorResponse: (res: Response, err: any) => Response<any>;
export default ErrorResponse;
