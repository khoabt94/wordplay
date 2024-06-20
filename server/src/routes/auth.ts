import express from 'express'
import { authControllers } from '../controllers'

const authRouter = express.Router()

authRouter.route('/signup').post(authControllers.signup)

export { authRouter }