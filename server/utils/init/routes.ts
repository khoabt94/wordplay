import { Express } from 'express'
import { CustomError } from '../error'
import { Routes } from '../../constants'
import { authRouter, userRouter, tableRouter } from '../../routes'

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