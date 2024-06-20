
export interface CustomErrorContent {
  message: string,
  context?: { [key: string]: any }
};

export enum ErrorName {
  CastError = 'CastError',
  DuplicateError = 11000,
  ValidationError = 'ValidationError',
  JsonWebTokenError = 'JsonWebTokenError',
  TokenExpiredError = 'TokenExpiredError'
}

interface ConstructorParams {
  message: string,
  statusCode: number
  [key: string]: any
}

export class CustomError extends Error {
  statusCode: number;
  status: string;
  [key: string]: any

  constructor({ message, statusCode }: ConstructorParams) {
    super(message);

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

