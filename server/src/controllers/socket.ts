import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from 'mongoose';
import { DEFAULT_USER_INFO_SELECT_FIELD, MatchLanguage, MatchMode, ServerToClientEventsKeys } from "../constants";
import { User } from "../models";
import CurrentMatches, { Match } from "../socket/match";
import CurrentTables, { Table } from "../socket/table";
import CurrentUsersOnline, { UserOnline } from "../socket/user-online";
import { CustomSocket } from "../utils/socket";

const authenticate = async (socket: CustomSocket, { access_token }: { access_token: string }) => {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY as string) as JwtPayload
    const user = await User.findById(decoded.id).select(DEFAULT_USER_INFO_SELECT_FIELD)


    if (!user) {
        socket.emit(ServerToClientEventsKeys.unauthenticated)
        return
    }
    const newUserOnline = new UserOnline({ socket_id: socket.id, user_id: String(user._id), user })
    CurrentUsersOnline.addUser(newUserOnline)
}

const findMatch = async (socket: CustomSocket, { match_mode, match_language, user_id }: { match_mode: MatchMode, match_language: MatchLanguage, user_id: string }) => {
    const user = await User.findById(user_id).select(DEFAULT_USER_INFO_SELECT_FIELD)


    if (!user) {
        socket.emit(ServerToClientEventsKeys.unauthenticated)
        return
    }

    const randomTable = CurrentTables.findRandomTable({
        match_mode,
        match_language
    })

    const newUserOnline = new UserOnline({ socket_id: socket.id, user_id: String(user._id), user })
    if (!randomTable) {
        const newTable = new Table({
            match_language,
            match_mode,
            players: [newUserOnline]
        })
        newTable.joinTable(newUserOnline)
        CurrentTables.createTable(newTable)
        socket.join(newTable.detail.table_id)
        socket.emit(ServerToClientEventsKeys.create_table, newTable)
    } else {
        const findTable = CurrentTables.findTable(randomTable.detail.table_id)
        if (!findTable) return;
        socket.join(findTable.detail.table_id)
        findTable.joinTable(newUserOnline)
    }
}

const cancelMatch = (socket: CustomSocket, { tableId }: { tableId: string }) => {
    CurrentTables.deleteTable(tableId)
    socket.leave(tableId)
}

const joinSpecificTable = (socket: CustomSocket, { tableId, user_id }: { tableId: string, user_id: string }) => {
    const findUser = CurrentUsersOnline.findUser(user_id)
    if (!findUser) {
        socket.emit(ServerToClientEventsKeys.join_specific_table_error, { message: 'User no longer online!' })
        return
    }
    const findTable = CurrentTables.findTable(tableId)
    if (!findTable) {
        socket.emit(ServerToClientEventsKeys.join_specific_table_error, { message: 'Table not found!. Please refresh table list' })
        return
    }
    const newUserOnline = new UserOnline({ socket_id: socket.id, user_id, user: findUser.user })
    socket.join(tableId)
    findTable.joinTable(newUserOnline)
}

const disconnect = (socket: CustomSocket) => {
    CurrentUsersOnline.removeUser(socket.id)
}

const acceptMatch = async (socket: CustomSocket, { tableId, userId }: { tableId: string, userId: string }) => {
    const findTable = CurrentTables.findTable(tableId)
    if (!findTable) return
    if (!findTable) {
        socket.emit(ServerToClientEventsKeys.join_specific_table_error, { message: 'Table not found!. Please refresh table list' })
        return
    }
    const checkAlreadyAcceptMatch = findTable.detail.player_acceptance.find(p => String(p) === userId)
    if (!checkAlreadyAcceptMatch) {
        findTable.acceptMatch(Object(userId))
    }

}


const joinedMatch = async (socket: CustomSocket, { match_id, user_id }: { match_id: string, user_id: string }) => {
    const findMatch = CurrentMatches.findMatch(match_id)
    if (!findMatch) {
        socket.emit(ServerToClientEventsKeys.join_match_error, { message: 'Match not found!' })
        return
    }
    findMatch.joinedMatch(Object(user_id))
}

const answer = async ({ match_id, ...rest }: { match_id: string, word: string, user_id: string }) => {
    const findMatch = CurrentMatches.findMatch(match_id)
    if (findMatch) {
        findMatch.checkAnswer(rest)
    }
}


const timeout = async ({ match_id, user_id }: { match_id: string, user_id: string }) => {
    const findMatch = CurrentMatches.findMatch(match_id)
    if (findMatch) {
        findMatch.timeout({ user_id })
    }
}

export const socketControllers = {
    authenticate,
    findMatch,
    cancelMatch,
    joinSpecificTable,
    disconnect,
    joinedMatch,
    answer,
    timeout,
    acceptMatch
}