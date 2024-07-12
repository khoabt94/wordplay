import { COOKIE_KEY, ClientToServerEventsKeys, QUERY_KEY, ServerToClientEventsKeys } from "@/constants";
import { useToast } from "@/hooks/utils";
import { useAuthStore, useSocketStore } from "@/stores";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";

export function SocketProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthStore()
    const { socket } = useSocketStore()
    const { toastSuccess } = useToast()
    const queryClient = useQueryClient()

    useEffect(() => {
        const access_token = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
        if (!socket || !user || !access_token) return;
        socket.emit(ClientToServerEventsKeys.authenticate, { access_token })
        socket.on(ServerToClientEventsKeys.unauthenticated, () => socket.disconnect());
        socket.on(ServerToClientEventsKeys.friend_request_receive, ({ friendRequest }) => {
            toastSuccess(`${friendRequest.sender.name} sends you a friend request`)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.FRIEND.GET_RECEIVED_FRIEND_REQUEST],
                refetchType: 'all'
            })
        });
        socket.on(ServerToClientEventsKeys.friend_request_decline, ({ friendRequest }) => {
            toastSuccess(`${friendRequest.receiver.name} decline your friend request`)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.FRIEND.GET_SENT_FRIEND_REQUEST],
                refetchType: 'all'
            })
        });
        socket.on(ServerToClientEventsKeys.friend_request_accept, ({ friendRequest }) => {
            toastSuccess(`${friendRequest.receiver.name} accept your friend request`)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.FRIEND.GET_FRIENDS],
                refetchType: 'all'
            })
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
