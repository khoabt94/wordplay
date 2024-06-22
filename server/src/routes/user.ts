import { authControllers, userControllers } from '../controllers'
import express from 'express'

const userRouter = express.Router()

userRouter
    .route('/info-me')
    .get(authControllers.verify, userControllers.getInfoMe)
    .patch(authControllers.verify, userControllers.updateInfoMe)
userRouter
    .route('/user-online')
    .get(authControllers.verify, userControllers.getUsersOnline)

export { userRouter }