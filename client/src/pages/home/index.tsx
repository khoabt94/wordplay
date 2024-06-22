import UserAvatar from "@/components/common/user-avatar";
import { siteConfig } from "@/configs/site";
import { QUERY_KEY, ServerToClientEventsKeys } from "@/constants";
import { useGetUsersOnline } from "@/hooks/queries";
import { useHandleRouter } from "@/hooks/utils";
import { User } from "@/interfaces";
import { useSocketStore } from "@/stores";
import { Avatar, AvatarGroup, Button, Card, Skeleton } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export default function HomePage() {
    const { socket } = useSocketStore()
    const { navigate } = useHandleRouter()
    const { data: dataUsersOnline, isFetching } = useGetUsersOnline()
    const usersOnline = useMemo(() => dataUsersOnline?.users || [], [dataUsersOnline])
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!socket) return;
        socket.on(ServerToClientEventsKeys.number_users_online, ({ users }: { users: User.Detail[] }) => {
            console.log({ users })
            queryClient.setQueryData([QUERY_KEY.USER.GET_USERS_ONLINE], { users })
        })


        return () => {
            socket.off(ServerToClientEventsKeys.number_users_online, () => console.log('numberUsersOnline'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);
    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-10">
            {isFetching ? (
                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
            ) : (
                <>
                    <h3 className="text-xl font-medium">
                        {usersOnline.length} users online!
                    </h3>
                    <AvatarGroup isBordered max={5}>
                        {usersOnline.map(user => (
                            <UserAvatar user={user} />
                        ))}
                    </AvatarGroup>
                    <Button
                        type="button"
                        variant="solid"
                        color="primary"
                        size="lg"
                        onClick={() => navigate(siteConfig.paths.findMatch())}
                        className="w-[300px] mt-10"
                    >
                        GO TO FIND MATCH
                    </Button>
                </>
            )}

        </div>
    )
}
