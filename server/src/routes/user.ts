import express from 'express'
import { authControllers, userControllers } from '../controllers'

const userRouter = express.Router()

userRouter.route('/get-info-me').get(authControllers.verify, userControllers.getInfoMe)

export { userRouter }