import { Express } from 'express'
import { CustomError } from '../error'
import { Routes } from '../../constants'
import { authRouter } from '../../routes'

export default (app: Express) => {
  app.use(Routes.auth, authRouter)


  app.all('*', (req, _res, _next) => {
    throw new CustomError({
      message: `Can't access ${req.originalUrl} on this server!`,
      statusCode: 404,
    })
  })
}