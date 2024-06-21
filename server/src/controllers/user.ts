import { NextFunction, Response } from "express"
import TypedRequest from "../interfaces/request"
import catchAsync from "../utils/catch-async"

const getInfoMe = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
  const { user } = req

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})


export const userControllers = {
  getInfoMe
}