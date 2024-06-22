import { io } from "../../server"
import { ServerToClientEventsKeys } from "../constants"
import { IUser } from "../models"

export interface IUserOnline {
    socket_id: string
    user_id: string
    user: IUser
}

export class UserOnline {
    socket_id: string
    user_id: string
    user: IUser

    constructor({ socket_id, user_id, user }: IUserOnline) {
        this.socket_id = socket_id
        this.user_id = user_id
        this.user = user
    }
}


class UsersOnline {
    users: IUserOnline[]

    constructor() {
        this.users = []
    }

    addUser(newUser: UserOnline) {
        const checkExist = this.users.find(u => u.user_id === newUser.user_id)
        if (!checkExist) {
            this.users.push(newUser)
        }
        this.emitUsersOnline()

    }

    findUser(user_id: string) {
        const checkExist = this.users.find(u => u.user_id === user_id)
        return checkExist || null
    }

    removeUser(socket_id: string) {
        this.users = this.users.filter(u => u.socket_id !== socket_id)
        this.emitUsersOnline()
    }

    emitUsersOnline() {
        this.users.forEach(user => {
            io.to(user.socket_id).emit(ServerToClientEventsKeys.number_users_online, {
                users: this.users.filter(u => u.user_id !== user.user_id).map(user => user.user)
            })
        })
    }
}

const CurrentUsersOnline = new UsersOnline()
export default CurrentUsersOnline