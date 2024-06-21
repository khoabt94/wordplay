import express from "express";
import initMiddlewares from './src/utils/init/middlewares'
import initDb from './src/utils/init/db'
import initRoutes from './src/utils/init/routes'
import initErrorHandler from './src/utils/init/error-handler'
import initSocket from './src/utils/init/socket'
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();

require('dotenv').config()
const port = process.env.PORT_SERVER;
const dataBaseUrl = process.env.DATABASE_URL?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD as string) as string


initMiddlewares(app);
initDb(dataBaseUrl)
initRoutes(app);
initErrorHandler(app);

const server = app.listen(port, () => {
  console.log(`Wordplay app listening on port ${port}`)
})

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});
initSocket(io)

process.on('unhandledRejection', (_err: Error) => {
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (_err: Error) => {
  server.close(() => {
    process.exit(1)
  })
})