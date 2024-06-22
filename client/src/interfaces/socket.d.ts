import { ClientToServerEventsKeys, MatchLanguage, MatchMode, ServerToClientEventsKeys } from "@/src/constants";
import { Table } from "./table";
import { User } from "./user";


export interface ServerToClientEvents {
    [ServerToClientEventsKeys.unauthenticated]: () => void
    [ServerToClientEventsKeys.create_table]: (table: Table.Detail) => void;
    [ServerToClientEventsKeys.cancel_match]: (_data: { tableId: string }) => void;
    [ServerToClientEventsKeys.join_specific_table_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.number_users_online]: (_data: { users: User.Detail[] }) => void;
    [ServerToClientEventsKeys.join_table]: (_data: { matchId: string }) => void;
    [ServerToClientEventsKeys.disconnect]: () => void;
}



export interface ClientToServerEvents {
    [ClientToServerEventsKeys.authenticate]: (_data: { access_token: string }) => void;
    [ClientToServerEventsKeys.find_match]: (_data: { game_mode: MatchModee, game_language: MatchLanguage, user_id: string }) => void;
    [ClientToServerEventsKeys.cancel_match]: (_data: { tableId: string }) => void;
    [ClientToServerEventsKeys.join_specific_table]: (_data: { tableId: string, user_id: string }) => void;
    [ClientToServerEventsKeys.disconnect]: () => void;
}



export interface InterServerEvents {
}

export interface SocketData {
}