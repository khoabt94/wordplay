import { Detail } from './match.d';
import { MatchLanguage, MatchMode } from "@/constants"
import { User } from './user';

export namespace Match {
    export interface History {
        order: number,
        user_id: string
        answer: string,
        isValid: boolean
    }

    export interface Result {
        winner: string
        loser: string
    }

    export interface Detail {
        match_mode: MatchMode
        match_language: MatchLanguage
        players: {
            user: User.Detail
        }[]
        match_id: string
        history: Match.History[]
        result: Match.Result
    }
}

