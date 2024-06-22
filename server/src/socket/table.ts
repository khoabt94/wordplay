import { MatchLanguage, MatchMode, ServerToClientEventsKeys } from "../constants"
import { v4 as uuid } from 'uuid';
import { Socket } from "socket.io";
import { io } from "../..";
import { IUserOnline } from "../interfaces";

interface ITable {
    table_id: string
    opponents: IUserOnline[]
    game_mode: MatchMode
    game_language: MatchLanguage
}

export class Table {
    table_id: string
    opponents: IUserOnline[]
    game_mode: MatchMode
    game_language: MatchLanguage

    constructor({ game_language, game_mode, opponents }: Omit<ITable, 'table_id'>) {
        this.table_id = uuid()
        this.opponents = opponents
        this.game_mode = game_mode
        this.game_language = game_language
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

    findRandomTable({ game_language, game_mode }: Omit<ITable, 'table_id' | 'opponents'>) {
        const availableAndSuitableTable = this.tables.filter(table => table.opponents.length === 1 && table.game_language === game_language && table.game_mode === game_mode)
        if (availableAndSuitableTable.length === 0) return null;
        else return availableAndSuitableTable[Math.floor(Math.random() * availableAndSuitableTable.length)];
    }

    joinTable(table_id: string, user: IUserOnline, socket: Socket) {
        const findTableIndex = this.tables.findIndex(table => table.table_id === table_id)
        if (findTableIndex === -1) return;
        this.tables[findTableIndex].opponents.push(user)
        const matchId = this.tables[findTableIndex].table_id
        socket.join(matchId)

        io.to(matchId).emit(ServerToClientEventsKeys.join_table, { matchId })

    }

}

const CurrentTables = new Tables()
export default CurrentTables