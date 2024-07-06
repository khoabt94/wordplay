import UserAvatar from "@/components/common/user-avatar";
import UserElo from "@/components/common/user-elo";
import { Friend } from "@/interfaces";
import { Button, Card, CardBody, Dropdown, DropdownTrigger } from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import { ReactNode } from "react";

type Props = {
    friendRequest: Friend.FriendRequestDetail
    render: (_friendRequest: Friend.FriendRequestDetail) => ReactNode
    keyField: 'sender' | 'receiver'
}

export function FriendRequestItem({ friendRequest, render, keyField }: Props) {
    return (
        <Card
            isBlurred
            className="border-none cursor-pointer dark:bg-default-100/80 friend-card"
            shadow="md"
        >
            <CardBody>
                <div className="flex gap-6 items-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <UserAvatar
                            user={friendRequest[keyField]}
                        />
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <div className="flex flex-col gap-2">
                            <p>{friendRequest[keyField].name}</p>
                            <UserElo
                                user={friendRequest[keyField]}
                            />
                        </div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant='ghost'
                                    radius='full'
                                    size='sm'
                                    className='!size-10 px-0 min-w-0 border-none'
                                >
                                    <EllipsisVertical size={16} opacity={0.5} />
                                </Button>
                            </DropdownTrigger>
                            {render(friendRequest)}
                        </Dropdown>

                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
