import express from 'express'
import { playerControllers } from '../controllers'

const playerRouter = express.Router()

playerRouter
    .route('/:playerId/profile')
    .get(playerControllers.getPlayerProfile)

playerRouter
    .route('/:playerId/match')
    .get(playerControllers.getPlayerMatch)


export { playerRouter }
