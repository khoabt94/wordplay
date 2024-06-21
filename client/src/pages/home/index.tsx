import { useAuthStore, useSocketStore } from "@/stores";
import { Suspense, useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button, Card } from "@nextui-org/react";
import { User } from "@/interfaces";
import { useHandleRouter } from "@/hooks/utils";
import { siteConfig } from "@/configs/site";
import { Skeleton } from "@nextui-org/react";

export default function HomePage() {
    const { socket } = useSocketStore()
    const { user } = useAuthStore()
    const { navigate } = useHandleRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [usersOnline, setUsersOnline] = useState<User.Detail[]>([])
    useEffect(() => {
        if (!socket) return;
        socket.on('numberUsersOnline', ({ users }: { users: User.Detail[] }) => {
            console.log({ users })
            setUsersOnline(users.filter(u => u._id !== user?._id))
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)

        })


        return () => {
            socket.off('numberUsersOnline', () => console.log('numberUsersOnline'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);
    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-10">
            {isLoading ? (
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
                            <Avatar
                                name={user.name.slice(0, 2).toUpperCase()}
                                isBordered
                                src={user.avatar}
                                size="lg"
                                className="cursor-pointer"
                                color="primary"
                            />
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
