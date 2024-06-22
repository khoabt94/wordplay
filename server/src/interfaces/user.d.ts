export interface IUser {
    name: string;
    email: string;
    avatar: string;
    password: string;
    passwordResetToken?: string;
    passwordResetTokenExpire?: Date
    passwordChangeAt?: Date
    level: number;
    xp: number;
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