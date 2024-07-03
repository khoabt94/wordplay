import { Model, Schema, model } from "mongoose";
import { IMatchModel, IMatchMethods, IMatchVirtuals, } from "../interfaces/match";
import { MatchLanguage, MatchMode } from "../constants";

type TMatchModel = Model<IMatchModel, {}, IMatchMethods, IMatchVirtuals>

const MatchSchema = new Schema<IMatchModel, TMatchModel, IMatchMethods, IMatchVirtuals>({
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
                type: Schema.ObjectId,
                ref: 'User',
            },
            answer: String,
            isValid: Boolean,
        }
    ],
    result: {
        winner: {
            user_id: {
                type: Schema.ObjectId,
                ref: 'User',
            },
            elo: {
                type: Number,
                required: [true, 'Please provide winner elo'],
                min: [0, 'Winner elo must be greater than 0'],
            },
        },
        loser: {
            user_id: {
                type: Schema.ObjectId,
                ref: 'User',
            },
            elo: {
                type: Number,
                required: [true, 'Please provide winner elo'],
                max: [0, 'Loser elo must be less than 0'],
            },
        },
    }
}, {
    timestamps: true
})


export const Match: TMatchModel = model<IMatchModel, TMatchModel>("Match", MatchSchema);
