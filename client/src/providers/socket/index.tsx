import { COOKIE_KEY, ClientToServerEventsKeys, ServerToClientEventsKeys } from "@/constants";
import { useToast } from "@/hooks/utils";
import { useAuthStore, useSocketStore } from "@/stores";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";

export function SocketProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthStore()
    const { socket } = useSocketStore()
    const { toastSuccess } = useToast()

    useEffect(() => {
        const access_token = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
        if (!socket || !user || !access_token) return;
        socket.emit(ClientToServerEventsKeys.authenticate, { access_token })
        socket.on(ServerToClientEventsKeys.unauthenticated, () => socket.disconnect());
        socket.on(ServerToClientEventsKeys.friend_request_receive, ({ friendRequest }) => {
            toastSuccess(`${friendRequest.sender.name} sends you a friend request`)
        });
        socket.on(ServerToClientEventsKeys.friend_request_decline, ({ friendRequest }) => {
            toastSuccess(`${friendRequest.receiver.name} decline your friend request`)
        });
        socket.on(ServerToClientEventsKeys.friend_request_accept, ({ friendRequest }) => {
            toastSuccess(`${friendRequest.receiver.name} accept your friend request`)
        });

        return () => {
            socket.off(ServerToClientEventsKeys.unauthenticated, () => console.log('unauthenticated'));
            socket.off(ServerToClientEventsKeys.friend_request_receive, () => console.log('friend_request_receive'));
            socket.off(ServerToClientEventsKeys.friend_request_decline, () => console.log('friend_request_decline'));
            socket.off(ServerToClientEventsKeys.friend_request_accept, () => console.log('friend_request_accept'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, user]);






    return children
}
