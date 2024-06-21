import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catch-async"
import TypedRequest from "../interfaces/request"
import { Body } from "../interfaces/body"
import { CustomError } from "../utils/error"
import { IUser, User } from "../models"
import { signToken } from "../utils/sign-token"
import jwt, { JwtPayload } from 'jsonwebtoken'

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
  const clonedUser: Partial<Pick<IUser, "password">> = newUser
  clonedUser.password = undefined
  const access_token = signToken({ user_id: newUser._id })

  res.status(200).json({
    status: 'success',
    data: {
      user: clonedUser,
      access_token
    }
  })

})

const login = catchAsync(async (req: TypedRequest<Body.Login, {}>, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {  
    return next(new CustomError({
      message: "Please provide your credientials",
      statusCode: 401
    }))
  }

  const findUser = await User.findOne({ email }).select('+password')

  if (!findUser || !await findUser.comparePassword(password, findUser.password)) {
    return next(new CustomError({
      message: "Invalid credentials",
      statusCode: 401
    }))
  }

  const clonedUser: Partial<Pick<IUser, "password">> = findUser
  clonedUser.password = undefined
  const access_token = signToken({ user_id: findUser._id })

  res.status(200).json({
    status: 'success',
    data: {
      user: clonedUser,
      access_token
    }
  })

})

const verify = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization || !(authorization.startsWith('Bearer'))) {
    return next(new CustomError({
      message: "Please login to get access this url",
      statusCode: 401
    }))
  }

  const receivedToken = authorization.replace('Bearer ', '')

  const decoded = jwt.verify(receivedToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
  const findUser = await User.findById(decoded.id)

  if (!findUser) {
    return next(new CustomError({
      message: "Invalids token. Please login to get access this url",
      statusCode: 404
    }))
  }


  req.user = findUser
  next()
})

const refreshToken = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
  const { user } = req
  const access_token = signToken({ user_id: user?._id })

  res.status(200).json({
    status: 'success',
    data: {
      access_token
    }
  })
})


export const authControllers = {
  signup,
  login,
  verify,
  refreshToken
}