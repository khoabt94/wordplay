import { User } from "@/interfaces"
import { cn } from "@/utils/cn"
import { getUserLevel } from "@/utils/get-rank"
import { Chip } from "@nextui-org/react"
import './user-elo.styles.css'

type Props = {
    user: User.Detail
    className?: string
}


export default function UserElo({ user, className }: Props) {
    const rankUser = getUserLevel(user.elo)
    return (
        <Chip
            color={rankUser.color}
            className={cn('elo-chip px-2', className)}
            classNames={{
                content: 'font-bold'
            }}
            radius="none"
        >
            {user.elo}
        </Chip>
    )
}
