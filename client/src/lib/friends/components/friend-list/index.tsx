import { ScrollShadow } from "@nextui-org/react";
import { FriendItem } from "../friend-item";
import { useDeleteFriend, useGetFriends } from "@/hooks/queries";
import { useMemo } from "react";
import { cn } from "@/utils/cn";
import { Friend } from "@/interfaces";

type Props = {
    className?: string
    friendsOnline: Friend.Detail[]
}

export function FriendList({ className, friendsOnline }: Props) {
    const { data: dataFriends } = useGetFriends()
    const friends = useMemo(() => dataFriends?.friends || [], [dataFriends])
    const { mutateAsync: deleteFriend } = useDeleteFriend()

    return (
        <ScrollShadow hideScrollBar className={cn('flex flex-col gap-y-5 py-4 ', className)}>
            {friends.length ? friends.map(friend => (
                <FriendItem
                    friend={friend.friend_info}
                    onClickDelete={() => deleteFriend({ friend_id: friend.friend_info._id })}
                    isOnline={!!friendsOnline.find(online => friend.friend_info._id === online.friend_info._id)}
                />
            )) : <p className='italic text-center text-gray-400 text-sm'>Empty friend list</p>}
        </ScrollShadow>
    )
}
