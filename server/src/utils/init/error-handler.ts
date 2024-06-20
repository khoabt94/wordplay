import { NextFunction, Request, Response, Express } from "express";
import { CustomError, ErrorName } from "../error";

const handleCastError = (err: CustomError) => {
  return new CustomError({
    statusCode: 400,
    message: `Invalid ${err.path}: ${err.value}`,
  })
}

const handleDuplicateError = (err: CustomError) => {
  const keyName = Object.keys(err.keyValue)[0];
  return new CustomError({
    statusCode: 400,
    message: `Duplicate '${keyName}' value: ${err.keyValue[keyName]}. Please use another value!`,
  })
}

const handleValidationError = (err: CustomError) => {
  const message = (Object.values(err.errors)[0] as { message: string }).message;
  return new CustomError({
    statusCode: 400,
    message,
  })
}

const handleJsonWebTokenError = (_err: CustomError) => {
  return new CustomError({
    statusCode: 401,
    message: "Invalids token. Please login to get access this url",
  })
}

const handleTokenExpiredError = (_err: CustomError) => {
  return new CustomError({
    statusCode: 401,
    message: "Expired token. Please login to get access this url",
  })
}

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  let clonedError = err
  if (err.name === ErrorName.CastError) {
    clonedError = handleCastError(err)
  } else if (err.code === ErrorName.DuplicateError) {
    clonedError = handleDuplicateError(err)
  } else if (err.name === ErrorName.ValidationError) {
    clonedError = handleValidationError(err)
  } else if (err.name === ErrorName.JsonWebTokenError) {
    clonedError = handleJsonWebTokenError(err)
  } else if (err.name === ErrorName.TokenExpiredError) {
    clonedError = handleTokenExpiredError(err)
  } else {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
  }

  res.status(clonedError.statusCode).json({
    status: clonedError.status,
    message: clonedError.message
  })
};

export default (app: Express) => {
  app.use(errorHandler)
}