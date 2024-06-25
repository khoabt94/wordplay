import { MatchLanguage, MatchMode, ServerToClientEventsKeys } from "../constants"
import { v4 as uuid } from 'uuid';
import { Socket } from "socket.io";
import { io } from "../..";
import { IUserOnline } from "../interfaces/user";

interface ITable {
    table_id: string
    players: IUserOnline[]
    match_mode: MatchMode
    match_language: MatchLanguage
}

export class Table {
    table_id: string
    players: IUserOnline[]
    match_mode: MatchMode
    match_language: MatchLanguage

    constructor({ match_language, match_mode, players }: Omit<ITable, 'table_id'>) {
        this.table_id = uuid()
        this.players = players
        this.match_mode = match_mode
        this.match_language = match_language
    }
}


class Tables {
    tables: Table[]

    constructor() {
        this.tables = []
    }

    createTable(newTable: Table, socket: Socket) {
        this.tables.push(newTable)
        socket.join(newTable.table_id)
    }

    deleteTable(table_id: string, socket: Socket) {
        this.tables = this.tables.filter(table => table.table_id !== table_id)
        socket.leave(table_id)
    }

    findTable(table_id: string) {
        const findTable = this.tables.find(table => table.table_id === table_id)
        return findTable ? findTable : null;
    }

    findRandomTable({ match_language, match_mode }: Omit<ITable, 'table_id' | 'players'>) {
        const availableAndSuitableTable = this.tables.filter(table => table.players.length === 1 && table.match_language === match_language && table.match_mode === match_mode)
        if (availableAndSuitableTable.length === 0) return null;
        else return availableAndSuitableTable[Math.floor(Math.random() * availableAndSuitableTable.length)];
    }

    joinTable(table_id: string, user: IUserOnline, socket: Socket) {
        const findTableIndex = this.tables.findIndex(table => table.table_id == table_id)
        if (findTableIndex === -1) return;
        this.tables[findTableIndex].players.push(user)
        const matchId = this.tables[findTableIndex].table_id
        socket.join(matchId)

        // io.to(matchId).emit(ServerToClientEventsKeys.joining_match, { matchId })
        io.to(matchId).emit(ServerToClientEventsKeys.found_match, { table: this.tables[findTableIndex] })

    }

}

const CurrentTables = new Tables()
export default CurrentTables