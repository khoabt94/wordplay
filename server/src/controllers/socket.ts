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

const acceptMatch = async ({ tableId, userId }: { tableId: string, userId: string }) => {
    const findExistingMatchIndex = CurrentMatches.findMatch(tableId)
    if (findExistingMatchIndex === -1) {
        const findTable = CurrentTables.findTable(tableId)
        if (!findTable) return
        const match = new Match({
            match_id: tableId,
            match_language: findTable.match_language,
            match_mode: findTable.match_mode,
            players: findTable.players
        })
        CurrentMatches.createMatch(match)
    } else {
        const userJoin = CurrentUsersOnline.findUser(userId)
        if (!userJoin) return
        CurrentMatches.matches[findExistingMatchIndex].matchStart()
    }
}


const joinedMatch = async ({ match_id, user_id }: { match_id: string, user_id: string }) => {
    const findExistingMatchIndex = CurrentMatches.findMatch(match_id)
    if (findExistingMatchIndex === -1) {
        const findTable = CurrentTables.findTable(match_id)
        if (!findTable) return
        const match = new Match({
            match_id,
            match_language: findTable.match_language,
            match_mode: findTable.match_mode,
            players: findTable.players
        })
        CurrentMatches.createMatch(match)
    } else {
        const userJoin = CurrentUsersOnline.findUser(user_id)
        if (!userJoin) return
        CurrentMatches.matches[findExistingMatchIndex].matchStart()
    }
}

const answer = async ({ match_id, ...rest }: { match_id: string, word: string, user_id: string }) => {
    const findExistingMatchIndex = CurrentMatches.findMatch(match_id)
    if (findExistingMatchIndex !== -1) {
        CurrentMatches.matches[findExistingMatchIndex].checkAnswer(rest)
    }
}


const timeout = async ({ match_id, user_id }: { match_id: string, user_id: string }) => {
    const findExistingMatchIndex = CurrentMatches.findMatch(match_id)
    if (findExistingMatchIndex !== -1) {
        CurrentMatches.matches[findExistingMatchIndex].timeout({ user_id })
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