import { Server, Socket } from "socket.io";
import { ClientToServerEventsKeys, ServerToClientEventsKeys } from "../constants";
import { socketControllers } from "../controllers";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../interfaces/socket";
import CurrentUsersOnline from "./user-online";

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

        socket.on(ClientToServerEventsKeys.cancel_find_match, (data) => {
            socketControllers.cancelFindMatch(socket, data)
        });

        socket.on(ClientToServerEventsKeys.join_specific_table, (data) => {
            socketControllers.joinSpecificTable(socket, data)
        });

        socket.on(ClientToServerEventsKeys.accept_match, (data) => {
            socketControllers.acceptMatch(socket, data)
        });

        socket.on(ClientToServerEventsKeys.cancel_found_match, (data) => {
            socketControllers.cancelFoundMatch(data)
        });

        socket.on(ClientToServerEventsKeys.joined_match, (data) => {
            socketControllers.joinedMatch(socket, data)
        });

        socket.on(ClientToServerEventsKeys.answer, (data) => {
            socketControllers.answer(data)
        });

        socket.on(ClientToServerEventsKeys.time_out, (data) => {
            socketControllers.timeout(data)
        });

        socket.on(ServerToClientEventsKeys.disconnect, () => {
            socketControllers.disconnect(socket)
        });
    });



}

