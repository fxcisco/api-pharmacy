import { CustomError } from "./CustomError";

export class BadInputsError extends CustomError {
  constructor(public message: string = 'Invalid request', public statusCode= 422){
    super(message);
    Object.setPrototypeOf(this, BadInputsError.prototype);
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