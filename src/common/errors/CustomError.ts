
export abstract class CustomError extends Error {
  public statusCode: number = 500;
  public type: string = 'APP_ERROR';

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors():{
    code: number;
    message: string;
    field?: string;
  }[]
}