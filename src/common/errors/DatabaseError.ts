import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError{
  reason = 'Error connecting to database';
  statusCode = 500;

  constructor(){
    super('Error connecting to DB');
    Object.setPrototypeOf(this, DatabaseError.prototype);
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