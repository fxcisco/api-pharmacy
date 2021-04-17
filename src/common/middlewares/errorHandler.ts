import 'colors';
import { __prod__ } from '@/config';
import { ErrorHandlerFN, MiddlewareFN } from '.';
import { CustomError, InvalidRouteError } from '../errors';


const invalidRouteHandler: MiddlewareFN = (req, res, next) => {
  const error = new InvalidRouteError(`Not Found: ${req.method} - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const customErrorHandler: ErrorHandlerFN = (err, _, res, __) => {
  let errorResponse: { message: string; code?: number; field?: string }[] = [
    { message: 'Server error, unable to process request' }
  ]

  if(err instanceof CustomError){
    res.status(err.statusCode);
    errorResponse = err.serializeErrors();
  } else {
    res.status(500);
  }

  if(!__prod__) {
    const stack = __prod__ ? null : err.stack;
    console.log(`${err.message}\n`.red.underline.bold,`${stack}`.red);
  }
  res.json(errorResponse);
}

export const errorHandler = (): [MiddlewareFN, ErrorHandlerFN] => {
  return [
    invalidRouteHandler,
    customErrorHandler
  ];
};