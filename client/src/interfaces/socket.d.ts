import { ClientToServerEventsKeys, MatchLanguage, MatchMode, ServerToClientEventsKeys } from "@/constants";
import { Table } from "./table";
import { User } from "./user";
import { Match } from "./match";
import { Friend } from "./friend";

export interface ServerToClientEvents {
    [ServerToClientEventsKeys.unauthenticated]: () => void
    [ServerToClientEventsKeys.create_table]: (table: Table.Detail) => void;
    [ServerToClientEventsKeys.match_found_cancel]: () => void;
    [ServerToClientEventsKeys.join_specific_table_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.number_users_online]: (_data: { users: IUser[] }) => void;
    [ServerToClientEventsKeys.found_match]: (_data: { table: Table.Detail }) => void;
    [ServerToClientEventsKeys.joining_match]: (_data: { table: Table.Detail }) => void;
    [ServerToClientEventsKeys.join_match_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.disconnect]: () => void;
    [ServerToClientEventsKeys.match_start]: (_data: { match: Match.Detail, word: string, user_id_turn: string }) => void;
    [ServerToClientEventsKeys.opponent_answer]: (word: string) => void;
    [ServerToClientEventsKeys.match_end]: (_data: { match: Match.Detail }) => void;

    [ServerToClientEventsKeys.friend_request_receive]: (_data: { friendRequest: Friend.FriendRequestDetail }) => void;
    [ServerToClientEventsKeys.friend_request_accept]: (_data: { friendRequest: Friend.FriendRequestDetail }) => void;
    [ServerToClientEventsKeys.friend_request_decline]: (_data: { friendRequest: Friend.FriendRequestDetail }) => void;
    [ServerToClientEventsKeys.invite_friend_error]: (_data: { message: string }) => void;
    [ServerToClientEventsKeys.wait_for_your_friend]: (_data: { table: Table.Detail }) => void;
    [ServerToClientEventsKeys.invite_match_by_friend]: (_data: { table: Table.Detail }) => void;
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