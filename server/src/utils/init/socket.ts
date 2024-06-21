import { createServer } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Server, Socket } from "socket.io";
import { User } from "../../models";
import CurrentUsersOnline from "../../socket/user";


export default (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("new socket connect", socket.id)

        socket.on('authenticate', async ({ access_token }) => {
            const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY as string) as JwtPayload
            const user = await User.findById(decoded.id)


            if (!user) {
                io.emit('unauthenticated')
                return
            }

            CurrentUsersOnline.addUser({ socket_id: socket.id, user_id: String(user._id), user })
        });

        socket.on("disconnect", () => {
            CurrentUsersOnline.removeUser(socket.id)
        });
    });



}

