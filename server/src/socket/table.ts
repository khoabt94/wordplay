import { MatchLanguage, MatchMode, ServerToClientEventsKeys } from "../constants"
import { v4 as uuid } from 'uuid';
import { Socket } from "socket.io";
import { io } from "../..";
import { IUserOnline } from "../interfaces/user";
import mongoose, { Schema } from "mongoose";
import CurrentMatches, { Match } from "./match";

const { ObjectId } = mongoose.Types;

export interface ITable {
    table_id: string
    players: IUserOnline[]
    match_language: MatchLanguage
    player_acceptance: Schema.Types.ObjectId[]
}

export class Table {
    detail: ITable

    constructor({ match_language, players }: Omit<ITable, 'table_id' | 'player_acceptance'>) {
        this.detail = {
            table_id: uuid(),
            players,
            match_language,
            player_acceptance: []
        }
    }

    joinTable(user: IUserOnline,) {
        this.detail.players.push(user)
        if (this.detail.players.length === 2) {
            io.to(this.detail.table_id).emit(ServerToClientEventsKeys.found_match, { table: this.detail })
        }

    }

    acceptMatch(userId: Schema.Types.ObjectId) {
        this.detail.player_acceptance.push(userId)

        // io.to(matchId).emit(ServerToClientEventsKeys.joining_match, { matchId })
        if (this.detail.player_acceptance.length === 2) {
            io.to(this.detail.table_id).emit(ServerToClientEventsKeys.joining_match, { table: this.detail })
            const match = new Match({
                match_id: this.detail.table_id,
                match_language: this.detail.match_language,
                players: this.detail.players
            })
            CurrentMatches.createMatch(match)
        }
    }
}


class Tables {
    tables: Table[]

    constructor() {
        this.tables = []
    }

    createTable(newTable: Table) {
        this.tables.push(newTable)
    }

    deleteTable(table_id: string) {
        this.tables = this.tables.filter(table => table.detail.table_id !== table_id)
    }

    findTable(table_id: string) {
        return this.tables.find(table => table.detail.table_id === table_id)
    }

    findTableOfUser(user_id: string) {
        return this.tables.find(table => table.detail.players.find(p => p.user_id === user_id))
    }

    findRandomTable({ match_language }: { match_language: ITable['match_language'] }) {
        const availableAndSuitableTable = this.tables.filter(table => table.detail.players.length === 1 && table.detail.match_language === match_language)

        if (availableAndSuitableTable.length === 0) return null;
        else return availableAndSuitableTable[Math.floor(Math.random() * availableAndSuitableTable.length)];
    }



}

const CurrentTables = new Tables()
export default CurrentTables