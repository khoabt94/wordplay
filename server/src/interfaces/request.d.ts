import { Request as ExpressRequest } from "express";

/**
 * Extended Express Request interface to pass Payload Object to the request. Used by the auth middleware to pass data to the request by token signing (jwt.sign) and token verification (jwt.verify).
 * @param userId:string
 */

export interface TypedRequest<B, Q> extends ExpressRequest {
  body: B,
  query: Q,
  user?: IUser
}
