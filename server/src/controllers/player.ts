import { NextFunction, Response } from "express"
import { TypedRequest } from "../interfaces/request"
import { User } from "../models"
import catchAsync from "../utils/catch-async"
import { Match } from "../models/match"

const getPlayerProfile = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { params: { playerId } } = req
  const user = await User.findById(playerId).select('-createdAt -__v -updatedAt -email -friends')

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

const getPlayerMatch = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { params: { playerId } } = req
  const matches = await Match.find({ players: playerId }).populate('players', '-createdAt -__v -updatedAt -email -friends')

  res.status(200).json({
    status: 'success',
    data: {
      matches
    }
  })
})

export const playerControllers = {
  getPlayerProfile,
  getPlayerMatch
}