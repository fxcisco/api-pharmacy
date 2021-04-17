import { CustomError } from './CustomError';

export class NotAuthorizedError extends CustomError {
  constructor(
    public message: string = 'Not Authorized'
  ) {
    super(message);
    this.statusCode = 401;
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
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
