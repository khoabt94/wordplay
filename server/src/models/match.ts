import { Model, Schema, model } from "mongoose";
import { IMatch, IMatchMethods, IMatchVirtuals, } from "../interfaces/match";
import { MatchLanguage, MatchMode } from "../constants";

type TMatchModel = Model<IMatch, {}, IMatchMethods, IMatchVirtuals>

const MatchSchema = new Schema<IMatch, TMatchModel, IMatchMethods, IMatchVirtuals>({
    match_mode: {
        type: String,
        enum: MatchMode,
        required: [true, 'Please provide match mode'],
    },
    match_language: {
        type: String,
        enum: MatchLanguage,
        required: [true, 'Please provide match language'],
    },
    players: {
        type: [Schema.ObjectId],
        ref: 'User',
        length: [2, 'Please provide 2 players']
    },
    history: [
        {
            order: Number,
            player: {
                type: [Schema.ObjectId],
                ref: 'User',
            },
            answer: String,
            isValid: Boolean,
        }
    ],
    result: {
        winner: {
            type: [Schema.ObjectId],
            ref: 'User',
        },
        loser: {
            type: [Schema.ObjectId],
            ref: 'User',
        },
    }
}, {
    timestamps: true
})


export const Match: TMatchModel = model<IMatch, TMatchModel>("Match", MatchSchema);
