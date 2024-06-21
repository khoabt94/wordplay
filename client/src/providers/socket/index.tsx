import { COOKIE_KEY } from "@/constants";
import { useAuthStore, useSocketStore } from "@/stores";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";

export function SocketProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthStore()
    const { socket } = useSocketStore()
    useEffect(() => {
        if (!socket || !user) return;
        const access_token = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
        socket.emit('authenticate', { access_token })
        socket.on('unauthenticated', () => socket.disconnect());


        return () => {
            socket.off('unauthenticated', () => console.log('unauthenticated'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, user]);
    return children
}
