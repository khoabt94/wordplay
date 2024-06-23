import UserAvatar from '@/components/common/user-avatar'
import { User } from '@/interfaces'
import FightIcon from '@/assets/fight-icon.png';
import { memo } from 'react';

type Props = {
    user: User.Detail
    opponent: User.Detail
}

const MemoizedPlayerList = memo(function PlayerList({ opponent, user }: Props) {
    return (
        <div className="flex gap-x-8 items-center h-[150px]">
            <div className="flex flex-col gap-y-3 items-center">
                <UserAvatar user={user} />
                <span className="text-[#FB2576] font-bold">{user.name}</span>
            </div>
            <div className=" flex h-auto size-8">
                <img src={FightIcon} className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-y-3 items-center ">
                <UserAvatar user={opponent} />
                <span className="text-blue-500 font-bold">{opponent.name}</span>
            </div>
        </div>
    )
})

export default MemoizedPlayerList
