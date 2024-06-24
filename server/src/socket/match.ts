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
    match_mode: MatchMode
    match_language: MatchLanguage
    players: IUserOnline[]
    match_id: string
    history: IHistory[]
    result: IResult | null
    dictionary: string[] | null
    turn: Schema.Types.ObjectId

    constructor({ match_id, match_language, match_mode, players }: Omit<IMatch, 'history' | 'result'>) {
        this.match_id = match_id
        this.players = players
        this.match_mode = match_mode
        this.match_language = match_language
        this.history = []
        this.result = null
        this.dictionary = null;
        this.turn = players[0].user._id
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
        const matchResponse: IMatchResponse = {
            history: this.history,
            match_id: this.match_id,
            match_language: this.match_language,
            match_mode: this.match_mode,
            players: withPlayersId ? this.players.map(player => player.user._id) : this.players.map(player => player.user),
            result: this.result,
        }
        return matchResponse
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
        io.to(this.match_id).emit(ServerToClientEventsKeys.match_start, ({ match: this.generateMatchResponse(false), word: randomWord, user_id_turn: String(this.turn) }))
    }

    checkAnswer({ word, user_id }: { word: string, user_id: string }) {
        if (!this.dictionary) return;
        const findWord = this.dictionary.find(w => w === word)
        // const findWord = this.dictionary[Math.floor(Math.random() * this.dictionary.length)]
        let opponent!: IUserOnline;
        let owner!: IUserOnline;
        this.players.forEach(player => {
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
                this.endMatch({
                    loser: owner.user._id,
                    winner: opponent.user._id,
                })
            }
        } else {
            io.to(opponent.socket_id).emit(ServerToClientEventsKeys.opponent_answer, (findWord))
            this.turn = opponent.user._id
        }

    }

    timeout({ user_id }: { user_id: string }) {
        let loser!: Schema.Types.ObjectId;
        let winner!: Schema.Types.ObjectId;
        this.players.forEach(player => {
            if (player.user_id !== user_id) winner = player.user._id
            else loser = player.user._id
        })
        this.endMatch({
            loser,
            winner
        })
    }

    pushHistory(history: Omit<IHistory, 'order'>) {
        const nextOrder = this.history.length
        this.history.push({
            ...history,
            order: nextOrder,
        })
    }


    async endMatch(result: { winner: Schema.Types.ObjectId, loser: Schema.Types.ObjectId }) {
        this.result = result

        // save match to db
        const newMatch = this.generateMatchResponse(true)
        await MatchModel.create(newMatch)

        // recalculate elo
        const findWinner = await User.findById(result.winner)
        const findLoser = await User.findById(result.loser)
        if (!findWinner || !findLoser) return
        const { winner_elo, loser_elo } = recalculateElo(findWinner.elo, findLoser.elo)
        findWinner.elo = winner_elo
        findLoser.elo = loser_elo
        await findWinner.save()
        await findLoser.save()

        io.to(this.match_id).emit(ServerToClientEventsKeys.match_end, ({
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


    findMatch(match_id: string) {
        const findMatch = this.matches.findIndex(match => match.match_id === match_id)
        return findMatch;
    }


}

const CurrentMatches = new Matches()
export default CurrentMatches

