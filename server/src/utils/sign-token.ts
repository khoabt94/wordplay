import jwt from 'jsonwebtoken';
import { Schema } from "mongoose";

export function signToken({ user_id }: { user_id: Schema.Types.ObjectId }) {
  return jwt.sign({
    id: user_id,
  }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRED_IN as string
  })
}