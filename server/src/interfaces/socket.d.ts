import mongoose from "mongoose";
import { ClientToServerEventsKeys, ServerToClientEventsKeys } from "../constants";
import { MatchLanguage, MatchMode } from "./server/src/constants";
import { IUser } from "./server/src/models";
import { Table } from "./server/src/socket/table";
import { IMatch, IMatchEndResponse } from "./match";
import { Match } from "../socket/match";



export interface ServerToClientEvents {
    [ServerToClientEventsKeys.unauthenticated]: () => void
    [ServerToClientEventsKeys.create_table]: (table: Table) => void;
    [ServerToClientEventsKeys.cancel_find_match]: (_data: { tableId: string }) => void;
    [ServerToClientEventsKeys.join_specific_table_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.number_users_online]: (_data: { users: IUser[] }) => void;
    [ServerToClientEventsKeys.found_match]: (_data: { table: Table }) => void;
    [ServerToClientEventsKeys.joining_match]: (_data: { table: Table }) => void;
    [ServerToClientEventsKeys.join_match_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.disconnect]: () => void;
    [ServerToClientEventsKeys.match_start]: (_data: { match: IMatchResponse, word: string, user_id_turn: string }) => void;
    [ServerToClientEventsKeys.opponent_answer]: (word: string) => void;
    [ServerToClientEventsKeys.match_end]: (_data: { match: IMatchResponse }) => void;
}


export interface ClientToServerEvents {
    [ClientToServerEventsKeys.authenticate]: (_data: { access_token: string }) => void;
    [ClientToServerEventsKeys.find_match]: (_data: { match_mode: MatchMode, match_language: MatchLanguage, user_id: string }) => void;
    [ClientToServerEventsKeys.cancel_find_match]: (_data: { tableId: string }) => void;
    [ClientToServerEventsKeys.cancel_found_match]: (_data: { tableId: string }) => void;
    [ClientToServerEventsKeys.accept_match]: (_data: { tableId: string, userId: string }) => void;
    [ClientToServerEventsKeys.join_specific_table]: (_data: { tableId: string, user_id: string }) => void;
    [ClientToServerEventsKeys.disconnect]: () => void;
    [ClientToServerEventsKeys.joined_match]: (_data: { match_id: string, user_id: any }) => void;
    [ClientToServerEventsKeys.answer]: (_data: { match_id: string, word: string, user_id: string }) => void;
    [ClientToServerEventsKeys.time_out]: (_data: { match_id: string, user_id: string }) => void;
}



export interface InterServerEvents {
}

export interface SocketData {
}