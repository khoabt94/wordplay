import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../interfaces/socket";
import { socketControllers } from "../controllers";
import { ClientToServerEventsKeys, ServerToClientEventsKeys } from "../constants";

export type CustomSocketServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>

export type CustomSocket = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>


export default (io: CustomSocketServer) => {
    io.on("connection", (socket) => {
        console.log("new socket connect", socket.id)

        socket.on(ClientToServerEventsKeys.authenticate, (data) => {
            socketControllers.authenticate(socket, data)
        });

        socket.on(ClientToServerEventsKeys.find_match, (data) => {
            socketControllers.findMatch(socket, data)
        });

        socket.on(ClientToServerEventsKeys.cancel_match, (data) => {
            socketControllers.cancelMatch(socket, data)
        });

        socket.on(ClientToServerEventsKeys.join_specific_table, (data) => {
            socketControllers.joinSpecificTable(socket, data)
        });

        socket.on(ServerToClientEventsKeys.disconnect, () => {
            socketControllers.disconnect(socket)
        });
    });



}

