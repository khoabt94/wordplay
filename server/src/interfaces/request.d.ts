import { Request as ExpressRequest } from "express";
import Payload from "./Payload";

/**
 * Extended Express Request interface to pass Payload Object to the request. Used by the auth middleware to pass data to the request by token signing (jwt.sign) and token verification (jwt.verify).
 * @param userId:string
 */

export interface TypedRequest<B, Q> extends ExpressRequest, Payload {
  body: B,
  query: Q
}

export default TypedRequest;