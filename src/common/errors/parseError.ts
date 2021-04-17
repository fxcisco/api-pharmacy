import { AppError } from "./AppError";
import { CustomError } from "./CustomError";

export const parseError = (error: any, fallback?: string) => {
  if(error instanceof CustomError){
    return error;
  }

  if(error.code === 'ECONNREFUSED'){
    return new AppError('Server feature is not available right now.', 500)
  }

  const messages = error.response?.data;
  if(Array.isArray(messages)){
    const errorData = messages[0];
    if(errorData?.type === 'APP_ERROR'){
      return new AppError(errorData.message, errorData.statusCode)
    } 
  }

  return new AppError(fallback || 'Request failed, server error.');
}