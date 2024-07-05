import { Express } from 'express'
import { CustomError } from '../utils/error'
import { authRouter, friendRouter, tableRouter, userRouter } from '../routes'
import { Routes } from '../constants'

export default (app: Express) => {
  app.use(Routes.auth, authRouter)
  app.use(Routes.user, userRouter)
  app.use(Routes.table, tableRouter)
  app.use(Routes.friend, friendRouter)


  app.all('*', (req, _res, _next) => {
    throw new CustomError({
      message: `Can't access ${req.originalUrl} on this server!`,
      statusCode: 404,
    })
  })
}