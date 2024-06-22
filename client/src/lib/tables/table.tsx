import { MatchLanguageOption, MatchModeOption } from "@/src/constants"
import { Table } from "@/src/interfaces"
import { Avatar, Button, Divider } from "@nextui-org/react"

type Props = {
    table: Table.Detail
    onClickJoin: () => void
}

export default function TableItem({ table, onClickJoin }: Props) {
    const { game_language, game_mode, opponents } = table
    const [user] = opponents
    return (
        <div className="w-full relative group pt-10">
            <Avatar
                name={user.name.slice(0, 2).toUpperCase()}
                isBordered
                src={user.avatar}
                size="lg"
                className="cursor-pointer absolute -translate-y-1/2 left-5 z-20 w-[80px] h-[80px]"
                color="primary"
            />
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
                <div className="relative flex-row pt-12 p-4 h-[100px] bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center space-x-6">
                    <div className="w-[40%] flex-shrink-0  text-center">
                        <p className="font-bold">Khoa Tien Bui</p>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="w-[10%] flex-shrink-0  text-center">
                        <p className="text-sm">1200</p>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="flex-1 text-xs leading-loose text-right">
                        <p>{MatchModeOption.find(option => option.value === game_mode)?.label}</p>
                        <p>{MatchLanguageOption.find(option => option.value === game_language)?.label}</p>
                    </div>
                </div>
            </div>

        </div>

    )
}
