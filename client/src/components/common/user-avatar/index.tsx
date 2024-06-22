import { User } from "@/interfaces";
import { cn } from "@/utils/cn";
import { getUserLevel } from "@/utils/get-rank";
import { Avatar } from "@nextui-org/react";

type Props = {
    user: User.Detail
    onClick?: () => void
    className?: string
}


export default function UserAvatar({ user, onClick, className = '' }: Props) {
    const rankUser = getUserLevel(user.elo)
    return (
        <Avatar
            name={user.name.slice(0, 2).toUpperCase()}
            isBordered
            onClick={() => onClick?.()}
            src={user.avatar}
            size="lg"
            className={cn("", className)}
            color={rankUser.color}
        />
    )
}
