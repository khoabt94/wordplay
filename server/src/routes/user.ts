import { authControllers, userControllers } from '../controllers'
import express from 'express'

const userRouter = express.Router()

userRouter.route('/get-info-me').get(authControllers.verify, userControllers.getInfoMe)
userRouter.route('/get-user-online').get(authControllers.verify, userControllers.getUsersOnline)

export { userRouter }