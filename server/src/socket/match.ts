import fs from "fs";
import { Schema } from "mongoose";
import { Match as MatchModel } from '../models/match'
import { io } from "../../index";
import { MatchLanguage, MatchMode, ServerToClientEventsKeys } from "../constants";
import { IHistory, IMatch, IMatchModel, IMatchResponse, IResult } from "../interfaces/match";
import { IUserOnline } from "../interfaces/user";
import { User } from "../models";
import { recalculateElo } from "../utils/calculate-elo";

export class Match {
    detail: IMatch
    dictionary: string[] | null
    turn: Schema.Types.ObjectId
    player_join: Schema.Types.ObjectId[]

    constructor({ match_id, match_language, players }: Omit<IMatch, 'history' | 'result'>) {
        this.detail = {
            match_id,
            players,
            match_language,
            history: [],
            result: null,
        }
        this.dictionary = null
        this.turn = players[0].user._id
        this.player_join = []
    }

    initDictionary() {
        const data = fs.readFileSync(`${__dirname}/../data/result.json`, { encoding: 'utf8', flag: 'r' });
        if (!data) {
            console.error("Đã xảy ra lỗi khi đọc tệp:");
            return;
        }
        this.dictionary = JSON.parse(data);
    }

    generateMatchResponse(withPlayersId: boolean) {
        const { history, match_id, match_language, players, result } = this.detail
        const matchResponse: IMatchResponse = {
            history,
            match_id,
            match_language,
            players: withPlayersId ? players.map(player => player.user._id) : players.map(player => player.user),
            result,
        }
        return matchResponse
    }

    joinedMatch(user_id: Schema.Types.ObjectId) {
        this.player_join.push(user_id)
        if (this.player_join.length === 2) {
            this.matchStart()
        }
    }

    matchStart() {
        this.initDictionary()
        if (!this.dictionary) return;
        const randomWord = this.dictionary[Math.floor(Math.random() * this.dictionary.length)]

        this.pushHistory({
            answer: randomWord,
            isValid: true,
            player: null
        })
        io.to(this.detail.match_id).emit(ServerToClientEventsKeys.match_start, ({ match: this.generateMatchResponse(false), word: randomWord, user_id_turn: String(this.turn) }))
    }

    async checkAnswer({ word, user_id }: { word: string, user_id: string }) {
        if (!this.dictionary) return;
        const findWord = this.dictionary.find(w => w === word)
        // const findWord = this.dictionary[Math.floor(Math.random() * this.dictionary.length)]
        let opponent!: IUserOnline;
        let owner!: IUserOnline;
        this.detail.players.forEach(player => {
            if (player.user_id !== user_id) opponent = player
            else owner = player
        })
        this.pushHistory({
            answer: word,
            isValid: !!findWord,
            player: owner.user._id
        })
        if (!findWord) {
            if (opponent && owner) {
                await this.endMatch({
                    loser: owner.user._id,
                    winner: opponent.user._id,
                })
            }
        } else {
            io.to(opponent.socket_id).emit(ServerToClientEventsKeys.opponent_answer, (findWord))
            this.turn = opponent.user._id
        }

    }

    async timeout({ user_id }: { user_id: string }) {
        let loser!: Schema.Types.ObjectId;
        let winner!: Schema.Types.ObjectId;
        this.detail.players.forEach(player => {
            if (player.user_id !== user_id) winner = player.user._id
            else loser = player.user._id
        })
        await this.endMatch({
            loser,
            winner
        })
    }

    pushHistory(history: Omit<IHistory, 'order'>) {
        const nextOrder = this.detail.history.length
        this.detail.history.push({
            ...history,
            order: nextOrder,
        })
    }


    async endMatch({ loser, winner }: { winner: Schema.Types.ObjectId, loser: Schema.Types.ObjectId }) {
        // recalculate elo
        const findWinner = await User.findById(winner)
        const findLoser = await User.findById(loser)
        if (!findWinner || !findLoser) return
        const { winner_elo, loser_elo } = recalculateElo(findWinner.elo, findLoser.elo)
        findWinner.elo += winner_elo
        findLoser.elo += loser_elo
        await findWinner.save()
        await findLoser.save()

        this.detail.result = {
            winner: {
                user_id: winner,
                elo: winner_elo
            },
            loser: {
                user_id: loser,
                elo: loser_elo
            },
        }

        // save match to db
        const newMatch = this.generateMatchResponse(true)
        await MatchModel.create(newMatch)



        io.to(this.detail.match_id).emit(ServerToClientEventsKeys.match_end, ({
            match: this.generateMatchResponse(false)
        }))
    }
}


class Matches {
    matches: Match[]

    constructor() {
        this.matches = []
    }

    createMatch(match: Match) {
        this.matches.push(match)
    }

    deleteMatch(match_id: string) {
        this.matches = this.matches.filter(table => table.detail.match_id !== match_id)
    }

    findMatch(match_id: string) {
        const findMatch = this.matches.find(match => match.detail.match_id === match_id)
        return findMatch;
    }


}

const CurrentMatches = new Matches()
export default CurrentMatches

