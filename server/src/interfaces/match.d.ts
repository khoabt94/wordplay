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
    winner: Schema.Types.ObjectId
    loser: Schema.Types.ObjectId
}

export interface IMatch {
    match_mode: MatchMode
    match_language: MatchLanguage
    players: IUserOnline[]
    match_id: string
    history: IHistory[]
    result: IResult | null
}

export interface IMatchEndResponse {
    match_mode: MatchMode
    match_language: MatchLanguage
    players: IUser[]
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