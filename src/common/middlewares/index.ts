import { Request, Response, NextFunction } from 'express';

export * from './asyncHandler';
export * from './errorHandler';

export type ErrorHandlerFN = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export type MiddlewareFN = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;