import UserAvatar from "@/components/common/user-avatar"
import UserElo from "@/components/common/user-elo"
import { MatchLanguageOption, MatchModeOption } from "@/constants"
import { Table } from "@/interfaces"
import { Avatar, Button, Divider } from "@nextui-org/react"

type Props = {
    table: Table.Detail
    onClickJoin: () => void
}

export default function TableItem({ table, onClickJoin }: Props) {
    const { match_language, match_mode, players } = table
    const [user] = players
    return (
        <div className="w-full relative group pt-10">
            <UserAvatar user={user} className="cursor-pointer absolute -translate-y-1/2 left-5 z-20 w-[80px] h-[80px]" />
            <Button
                type="button"
                color="primary"
                variant="solid"
                size="md"
                radius="sm"
                className="right-5 absolute -translate-y-1/2 z-20"
                onClick={onClickJoin}
            >
                Play
            </Button>
            <div className="relative  w-full ">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FB2576] to-violet-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative pt-12 p-4 bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none items-center grid grid-cols-[1.5fr_1fr_1fr] divide-x-1 border-gray-600">
                    <p className="font-bold truncate flex-shrink-0  text-left">Khoa Tien Bui</p>
                    <div className="flex-shrink-0  text-center flex justify-center items-center h-full border-inherit">
                        <UserElo
                            user={user}
                        />
                    </div>
                    <div className="text-xs leading-loose text-right  border-inherit">
                        <p>{MatchModeOption.find(option => option.value === match_mode)?.label}</p>
                        <p>{MatchLanguageOption.find(option => option.value === match_language)?.label}</p>
                    </div>
                </div>
            </div>

        </div>

    )
}
