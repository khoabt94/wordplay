import { Match } from "@/interfaces/match"
import { Chip } from "@nextui-org/react"

type Props = {
    histories: Match.History[]
    user_id: string,
}

export default function Histories({ histories, user_id }: Props) {
    return (
        <div className="flex flex-row gap-3 flex-wrap">
            {histories.map(history => <Chip key={history.order} color={history.player === user_id ? 'primary' : 'default'} className="capitalize">{history.answer}</Chip>)}
        </div>
    )
}
