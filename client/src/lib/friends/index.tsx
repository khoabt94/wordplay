import { QUERY_KEY, ServerToClientEventsKeys } from "@/constants";
import { useGetUsersOnline } from "@/hooks/queries";
import { User } from "@/interfaces";
import { useSocketStore } from "@/stores";
import { User as UserComponent, ScrollShadow } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export default function FriendsList() {
    const { socket } = useSocketStore()
    const { data: dataUsersOnline, isFetching } = useGetUsersOnline()
    const usersOnline = useMemo(() => dataUsersOnline?.users || [], [dataUsersOnline])
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!socket) return;
        socket.on(ServerToClientEventsKeys.number_users_online, ({ users }: { users: User.Detail[] }) => {
            queryClient.setQueryData([QUERY_KEY.USER.GET_USERS_ONLINE], { users })
        })


        return () => {
            socket.off(ServerToClientEventsKeys.number_users_online, () => console.log('numberUsersOnline'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    return (
        <ScrollShadow hideScrollBar className='flex flex-col gap-y-5 py-4 h-[600px]'>
            {usersOnline.map((user) => (<UserComponent
                key={user._id}
                className='justify-start'
                name={user.name}
                description="Product Designer"
                avatarProps={{
                    src: user.avatar
                }}
            />))}
        </ScrollShadow>
    )
}
