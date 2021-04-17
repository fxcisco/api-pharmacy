import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  constructor(
    public message: string = 'Not found',
  ) {
    super(message);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
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
