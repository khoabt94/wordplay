import { authControllers, userControllers } from '../controllers'
import express from 'express'

const userRouter = express.Router()

userRouter
    .route('/my-profile')
    .get(authControllers.verify, userControllers.getMyProfile)
    .patch(authControllers.verify, userControllers.updateMyProfile)
userRouter
    .route('/my-match')
    .get(authControllers.verify, userControllers.getMyMatches)
userRouter
    .route('/user-online')
    .get(authControllers.verify, userControllers.getUsersOnline)

export { userRouter }