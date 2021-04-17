import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  constructor(public message: string = 'Invalid request', public statusCode= 400){
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      {
        type: this.type,
        message: this.message,
        code: this.statusCode,
      },
    ];
  }
}