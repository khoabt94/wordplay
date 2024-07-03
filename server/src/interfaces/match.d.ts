import { Schema } from "mongoose"
import { MatchLanguage, MatchMode } from "../constants"
import { IUser, IUserOnline } from "./user"

export interface IHistory {
    order: number,
    player: Schema.Types.ObjectId | null;
    answer: string,
    isValid: boolean
}

export interface IResult {
    winner: {
        user_id: Schema.Types.ObjectId
        elo: number
    }
    loser: {
        user_id: Schema.Types.ObjectId
        elo: number
    }
}

export interface IMatch {
    match_language: MatchLanguage
    players: IUserOnline[]
    match_id: string
    history: IHistory[]
    result: IResult | null

}

export interface IMatchResponse {
    match_language: MatchLanguage
    players: (IUser | Schema.Types.ObjectId)[]
    match_id: string
    history: IHistory[]
    result: IResult | null
}

export interface IMatchModel extends IMatch {
    players: Schema.Types.ObjectId[]
}

export interface IMatchMethods {
}

export interface IMatchVirtuals {

}