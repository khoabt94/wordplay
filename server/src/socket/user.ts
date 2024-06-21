import { io } from "../.."
import { IUser } from "../models"

interface IUserOnline {
    socket_id: string
    user_id: string
    user: IUser
}


class UsersOnline {
    users: IUserOnline[]

    constructor() {
        this.users = []
    }

    addUser({ socket_id, user_id, user }: { socket_id: string, user_id: string, user: IUser }) {
        const checkExist = this.users.find(u => u.user_id === user_id)
        if (!checkExist) {
            this.users.push({ socket_id, user_id, user })
        }
        this.emitUsersOnline()

    }

    findUser(user_id: string) {
        const checkExist = this.users.find(u => u.user_id === user_id)
        return checkExist ? checkExist.socket_id : null
    }

    removeUser(socket_id: string) {
        this.users = this.users.filter(u => u.socket_id !== socket_id)
        this.emitUsersOnline()
    }

    emitUsersOnline() {
        this.users.forEach(user => {
            io.to(user.socket_id).emit('numberUsersOnline', {
                users: CurrentUsersOnline.users.map(user => user.user)
            })
        })
    }
}

const CurrentUsersOnline = new UsersOnline()
export default CurrentUsersOnline