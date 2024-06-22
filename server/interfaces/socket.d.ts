import { ClientToServerEventsKeys, ServerToClientEventsKeys } from "../constants";
import { MatchLanguage, MatchMode } from "./server/src/constants";
import { IUser } from "./server/src/models";
import { Table } from "./server/src/socket/table";



export interface ServerToClientEvents {
    [ServerToClientEventsKeys.unauthenticated]: () => void
    [ServerToClientEventsKeys.create_table]: (table: Table) => void;
    [ServerToClientEventsKeys.cancel_match]: (_data: { tableId: string }) => void;
    [ServerToClientEventsKeys.join_specific_table_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.number_users_online]: (_data: { users: IUser[] }) => void;
    [ServerToClientEventsKeys.join_table]: (_data: { matchId: string }) => void;
    [ServerToClientEventsKeys.disconnect]: () => void;
}


export interface ClientToServerEvents {
    [ClientToServerEventsKeys.authenticate]: (_data: { access_token: string }) => void;
    [ClientToServerEventsKeys.find_match]: (_data: { game_mode: MatchMode, game_language: MatchLanguage, user_id: string }) => void;
    [ClientToServerEventsKeys.cancel_match]: (_data: { tableId: string }) => void;
    [ClientToServerEventsKeys.join_specific_table]: (_data: { tableId: string, user_id: string }) => void;
    [ClientToServerEventsKeys.disconnect]: () => void;
}



export interface InterServerEvents {
}

export interface SocketData {
}