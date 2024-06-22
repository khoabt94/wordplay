import { Express } from 'express'
import { CustomError } from './error'
import { authRouter, tableRouter, userRouter } from '../routes'
import { Routes } from '../constants'

export default (app: Express) => {
  app.use(Routes.auth, authRouter)
  app.use(Routes.user, userRouter)
  app.use(Routes.table, tableRouter)


  app.all('*', (req, _res, _next) => {
    throw new CustomError({
      message: `Can't access ${req.originalUrl} on this server!`,
      statusCode: 404,
    })
  })
}