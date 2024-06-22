import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models";
import { CustomSocket } from "../utils/socket";
import CurrentUsersOnline, { UserOnline } from "../socket/user-online";
import { MatchLanguage, MatchMode, ServerToClientEventsKeys } from "../constants";
import CurrentTables, { Table } from "../socket/table";

const authenticate = async (socket: CustomSocket, { access_token }: { access_token: string }) => {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY as string) as JwtPayload
    const user = await User.findById(decoded.id)


    if (!user) {
        socket.emit(ServerToClientEventsKeys.unauthenticated)
        return
    }
    const newUserOnline = new UserOnline({ socket_id: socket.id, user_id: String(user._id), user })
    CurrentUsersOnline.addUser(newUserOnline)
}

const findMatch = async (socket: CustomSocket, { game_mode, game_language, user_id }: { game_mode: MatchMode, game_language: MatchLanguage, user_id: string }) => {
    const user = await User.findById(user_id)


    if (!user) {
        socket.emit(ServerToClientEventsKeys.unauthenticated)
        return
    }

    const randomTable = CurrentTables.findRandomTable({
        game_mode,
        game_language
    })

    const newUserOnline = new UserOnline({ socket_id: socket.id, user_id: String(user._id), user })
    if (!randomTable) {
        const newTable = new Table({
            game_language,
            game_mode,
            opponents: [newUserOnline]
        })
        CurrentTables.createTable(newTable, socket)

        socket.emit(ServerToClientEventsKeys.create_table, newTable)
    } else {
        CurrentTables.joinTable(randomTable.table_id, newUserOnline, socket)
    }
}

const cancelMatch = (socket: CustomSocket, { tableId }: { tableId: string }) => {
    CurrentTables.deleteTable(tableId, socket)
}

const joinSpecificTable = (socket: CustomSocket, { tableId, user_id }: { tableId: string, user_id: string }) => {
    const findUser = CurrentUsersOnline.findUser(user_id)
    if (!findUser) {
        socket.emit(ServerToClientEventsKeys.join_specific_table_error, { message: 'User not found!' })
        return
    }
    const findTable = CurrentTables.findTable(tableId)
    if (!findTable) {
        socket.emit(ServerToClientEventsKeys.join_specific_table_error, { message: 'Table not found!. Please refresh table list' })
        return
    }
    const newUserOnline = new UserOnline({ socket_id: socket.id, user_id, user: findUser.user })
    CurrentTables.joinTable(tableId, newUserOnline, socket)
}

const disconnect = (socket: CustomSocket) => {
    CurrentUsersOnline.removeUser(socket.id)
}


export const socketControllers = {
    authenticate,
    findMatch,
    cancelMatch,
    joinSpecificTable,
    disconnect
}