import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catch-async"
import TypedRequest from "../interfaces/request"
import { Body } from "../interfaces/body"
import { CustomError } from "../utils/error"
import { User } from "../models"
import { signToken } from "../utils/sign-token"

const signup = catchAsync(async (req: TypedRequest<Body.Signup, {}>, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body

  if (!name || !email || !password) {
    return next(new CustomError({
      message: "Please provide required information",
      statusCode: 400
    }))
  }

  const findUser = await User.findOne({ email })

  if (findUser) {
    return next(new CustomError({
      message: "There is another user with registered email!",
      statusCode: 400
    }))
  }

  const newUser = await User.create({
    name, email, password
  })
  //@ts-ignore
  newUser.password = undefined
  const access_token = signToken({ user_id: newUser._id })

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
      access_token
    }
  })

})


export const authControllers = {
  signup
}