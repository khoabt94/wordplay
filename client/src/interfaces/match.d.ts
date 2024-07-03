import { Detail } from './match.d';
import { MatchLanguage, MatchMode } from "@/constants"
import { User } from './user';

export namespace Match {
    export interface History {
        order: number,
        player: string | null
        answer: string,
        isValid: boolean
    }

    export interface Result {
        winner: {
            user_id: string
            elo: number
        }
        loser: {
            user_id: string
            elo: number
        }
    }

    export interface Detail {
        match_language: MatchLanguage
        players: User.Detail[]
        match_id: string
        history: Match.History[]
        result: Match.Result
    }
}

