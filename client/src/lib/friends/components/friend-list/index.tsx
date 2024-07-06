import { ScrollShadow } from "@nextui-org/react";
import { FriendItem } from "../friend-item";
import { useDeleteFriend, useGetFriends } from "@/hooks/queries";
import { useMemo } from "react";

export function FriendList() {
    const { data: dataFriends } = useGetFriends()
    const friends = useMemo(() => dataFriends?.friends || [], [dataFriends])
    const { mutateAsync: deleteFriend } = useDeleteFriend()

    return (
        <ScrollShadow hideScrollBar className='flex flex-col gap-y-5 py-4 h-[600px]'>
            {friends.length ? friends.map(friend => (
                <FriendItem
                    friend={friend.friend_info}
                    onClickDelete={() => deleteFriend({ friend_id: friend.friend_info._id })}
                />
            )) : <p className='italic text-center text-gray-400 text-sm'>Empty friend list</p>}
        </ScrollShadow>
    )
}
