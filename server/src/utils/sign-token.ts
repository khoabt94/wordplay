import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

export function signToken({ user_id }: { user_id: mongoose.Types.ObjectId }) {
  return jwt.sign({
    id: user_id,
  }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRED_IN as string
  })
}