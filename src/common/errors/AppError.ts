import { CustomError } from './CustomError';

export class AppError extends CustomError {
  constructor(public message: string, public statusCode = 400) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
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
