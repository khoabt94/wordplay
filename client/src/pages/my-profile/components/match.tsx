import UserAvatar from "@/components/common/user-avatar"
import { MatchLanguageOption, MatchModeOption } from "@/constants"
import { Match, User } from "@/interfaces"
import { useAuthStore } from "@/stores"
import { cn } from "@/utils/cn"
import { Divider } from "@nextui-org/react"
import { useMemo } from "react"

type Props = {
    match: Match.Detail
}


export default function MatchItem({ match }: Props) {
    const { user } = useAuthStore()
    const { history, match_language, match_mode, players, result } = match
    const opponent = useMemo(() => players.find(player => player._id !== user?._id), [players])
    const isWin = useMemo(() => result.winner === user?._id, [result])

    return (
        <div
            className={cn('h-[100px] rounded-xl px-4 py-2 gap-x-4 w-full bg-gray-800 flex items-center relative border-2 ', isWin ? 'border-green-600' : 'border-red-600')}
        >
            <UserAvatar user={opponent as User.Detail} className=" w-16 h-16" />
            <div className="flex-1">
                <p className={cn('font-bold uppercase', isWin ? 'text-green-500' : 'text-red-500')}>{isWin ? 'Victory' : 'Defeat'}</p>
                <div className="h-[25px] mt-3 flex-row leading-none flex items-center w-full">
                    <div className="w-[20%] flex-shrink-0 ">
                        <p>{MatchModeOption.find(option => option.value === match_mode)?.label}</p>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="w-[20%] flex-shrink-0  text-center">
                        <p>{MatchLanguageOption.find(option => option.value === match_language)?.label}</p>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="flex-1 pl-4 flex gap-x-2 text-xs leading-loose text-right">
                        <p>Words length: </p>
                        <p className="font-medium">{history.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
