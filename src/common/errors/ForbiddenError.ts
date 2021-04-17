import { CustomError } from './CustomError';

export class ForbiddenError extends CustomError {
  constructor(
    public message: string = 'Not Authorized'
  ) {
    super(message);
    this.statusCode = 403;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
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
