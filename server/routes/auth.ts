import express from 'express'
import { authControllers } from '../controllers'

const authRouter = express.Router()

authRouter.route('/signup').post(authControllers.signup)

authRouter.route('/login').post(authControllers.login)

authRouter.route('/refresh-token').post(authControllers.verify, authControllers.refreshToken)

export { authRouter }