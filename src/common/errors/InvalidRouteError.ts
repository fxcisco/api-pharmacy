import { CustomError } from './CustomError';

export class InvalidRouteError extends CustomError {
  constructor(
    public message: string = 'Invalid route',
    public statusCode = 404
  ) {
    super(message);
    Object.setPrototypeOf(this, InvalidRouteError.prototype);
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
