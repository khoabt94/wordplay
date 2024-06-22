import { NextFunction, Response } from "express"
import catchAsync from "../utils/catch-async"
import CurrentUsersOnline from "../socket/user-online"
import { TypedRequest } from "../interfaces/request"
import { Body } from "../interfaces/body"
import { User } from "../models"

const getInfoMe = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})


const updateInfoMe = catchAsync(async (req: TypedRequest<Body.UpdateInfoMe, {}>, res: Response, _next: NextFunction) => {
  const { user } = req
  const { avatar, banner, name } = req.body

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    avatar, banner, name
  }, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
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
  getUsersOnline,
  updateInfoMe
}