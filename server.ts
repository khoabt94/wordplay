import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './server/interfaces/socket';
import express from "express";
import { Server } from "socket.io";
import initDb from './server/utils/init/db';
import initErrorHandler from './server/utils/init/error-handler';
import initMiddlewares from './server/utils/init/middlewares';
import initRoutes from './server/utils/init/routes';
import initSocket from './server/utils/init/socket';

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

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
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