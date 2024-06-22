import { authControllers, tableControllers } from '../controllers'
import express from 'express'

const tableRouter = express.Router()

tableRouter.route('/table').get(authControllers.verify, tableControllers.getTables)

export { tableRouter }