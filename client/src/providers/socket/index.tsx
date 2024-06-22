import { COOKIE_KEY, ClientToServerEventsKeys, ServerToClientEventsKeys } from "@/src/constants";
import { useAuthStore, useSocketStore } from "@/stores";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";

export function SocketProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthStore()
    const { socket } = useSocketStore()
    useEffect(() => {
        const access_token = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
        if (!socket || !user || !access_token) return;
        socket.emit(ClientToServerEventsKeys.authenticate, { access_token })
        socket.on(ServerToClientEventsKeys.unauthenticated, () => socket.disconnect());


        return () => {
            socket.off(ServerToClientEventsKeys.unauthenticated, () => console.log('unauthenticated'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, user]);
    return children
}
