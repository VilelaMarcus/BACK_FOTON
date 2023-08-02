/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NextFunction = (error?: any) => void;

type Middleware = (
  request: Request,
  response: Request,
  next: NextFunction,
) => void;

const runMiddleware = (
  request: Request,
  response: Response,
  middleware: Middleware,
) =>
  new Promise((resolve, reject) => {
    // @ts-ignore
    middleware(request, response, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

export default runMiddleware;
