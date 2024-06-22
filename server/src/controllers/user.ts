import { NextFunction, Response } from "express"
import catchAsync from "../utils/catch-async"
import CurrentUsersOnline from "../socket/user-online"
import { TypedRequest } from "../interfaces"

const getInfoMe = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

const getUsersOnline = catchAsync(async (req: TypedRequest<{}, {}>, res: Response) => {
  const { user } = req
  const usersOnline = CurrentUsersOnline.users.filter(u => u.user_id !== String(user._id)).map(user => user.user)

  res.status(200).json({
    status: 'success',
    data: {
      users: usersOnline
    }
  })
})

export const userControllers = {
  getInfoMe,
  getUsersOnline
}