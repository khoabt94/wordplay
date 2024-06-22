import { ErrorConstructorParams } from "../interfaces";

export class CustomError extends Error {
  statusCode: number;
  status: string;
  [key: string]: any

  constructor({ message, statusCode }: ErrorConstructorParams) {
    super(message);

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

