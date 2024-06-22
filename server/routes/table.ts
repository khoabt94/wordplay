import express from 'express'
import { authControllers, tableControllers } from '../controllers'

const tableRouter = express.Router()

tableRouter.route('/table').get(authControllers.verify, tableControllers.getTables)

export { tableRouter }