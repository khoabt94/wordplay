import { Schema } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    avatar: string;
    banner: string;
    password: string;
    passwordResetToken?: string;
    passwordResetTokenExpire?: Date
    passwordChangeAt?: Date
    elo: number;
    _id: Schema.Types.ObjectId
}

export interface IUserMethods {
    comparePassword: (_candidate: string, _hash: string) => Promise<boolean>
}

export interface IUserVirtuals {

}

export interface IUserOnline {
    socket_id: string
    user_id: string
    user: IUser
}