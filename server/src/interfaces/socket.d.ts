import mongoose from "mongoose";
import { ClientToServerEventsKeys, ServerToClientEventsKeys } from "../constants";
import { MatchLanguage, MatchMode } from "./server/src/constants";
import { IUser } from "./server/src/models";
import { Table } from "./server/src/socket/table";
import { IMatch, IMatchEndResponse } from "./match";
import { Match } from "../socket/match";
import { ITable } from "../socket/table";
import { IFriendRequest } from "./friend-request";



export interface ServerToClientEvents {
    [ServerToClientEventsKeys.unauthenticated]: () => void
    [ServerToClientEventsKeys.create_table]: (table: ITable) => void;
    [ServerToClientEventsKeys.match_found_cancel]: () => void;
    [ServerToClientEventsKeys.join_specific_table_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.number_users_online]: (_data: { users: IUser[] }) => void;
    [ServerToClientEventsKeys.found_match]: (_data: { table: Table }) => void;
    [ServerToClientEventsKeys.joining_match]: (_data: { table: Table }) => void;
    [ServerToClientEventsKeys.join_match_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.disconnect]: () => void;
    [ServerToClientEventsKeys.match_start]: (_data: { match: IMatchResponse, word: string, user_id_turn: string }) => void;
    [ServerToClientEventsKeys.opponent_answer]: (word: string) => void;
    [ServerToClientEventsKeys.match_end]: (_data: { match: IMatchResponse }) => void;

    [ServerToClientEventsKeys.friend_request_receive]: (_data: { friendRequest: IFriendRequest }) => void;
    [ServerToClientEventsKeys.friend_request_accept]: (_data: { friendRequest: IFriendRequest }) => void;
    [ServerToClientEventsKeys.friend_request_decline]: (_data: { friendRequest: IFriendRequest }) => void;
    [ServerToClientEventsKeys.invite_friend_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.wait_for_your_friend]: (_data: { table: Table }) => void;
    [ServerToClientEventsKeys.invite_match_by_friend]: (_data: { table: Table }) => void;
}


export interface ClientToServerEvents {
    [ClientToServerEventsKeys.authenticate]: (_data: { access_token: string }) => void;
    [ClientToServerEventsKeys.find_match]: (_data: { match_language: MatchLanguage, user_id: string }) => void;
    [ClientToServerEventsKeys.cancel_find_match]: (_data: { tableId: string }) => void;
    [ClientToServerEventsKeys.cancel_found_match]: (_data: { tableId: string }) => void;
    [ClientToServerEventsKeys.accept_match]: (_data: { tableId: string, userId: string }) => void;
    [ClientToServerEventsKeys.join_specific_table]: (_data: { tableId: string, user_id: string }) => void;
    [ClientToServerEventsKeys.disconnect]: () => void;
    [ClientToServerEventsKeys.joined_match]: (_data: { match_id: string, user_id: any }) => void;
    [ClientToServerEventsKeys.answer]: (_data: { match_id: string, word: string, user_id: string }) => void;
    [ClientToServerEventsKeys.time_out]: (_data: { match_id: string, user_id: string }) => void;
    [ClientToServerEventsKeys.invite_friend]: (_data: { match_language: MatchLanguage, user_id: string, friend_id: string }) => void;

}



export interface InterServerEvents {
}

export interface SocketData {
}