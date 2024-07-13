import UserAvatar from '@/components/common/user-avatar'
import UserElo from '@/components/common/user-elo'
import { useAuthStore } from '@/stores'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { EllipsisVertical } from 'lucide-react'
import './friend.styles.css'
import { User } from '@/interfaces'
import { siteConfig } from '@/configs/site'
import { cn } from '@/utils/cn'
import { useMemo } from 'react'

type Props = {
    friend: User.Detail
    onClickDelete: () => void
    isOnline: boolean
}

export const FriendItem = ({ friend, onClickDelete, isOnline }: Props) => {
    const disabledKey = useMemo(() => {
        if (isOnline) return []
        else return ['invite']
    }, [isOnline])

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
                            user={friend}
                        />
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <div className="flex flex-col gap-2">
                            <div className='flex items-center gap-x-2'>
                                <div className={cn("size-2 rounded-full", isOnline ? 'bg-green-500' : 'bg-gray-300')}></div>
                                <p>{friend.name}</p>
                            </div>
                            <UserElo
                                user={friend}
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
                            <DropdownMenu aria-label="Static Actions" disabledKeys={disabledKey}>
                                <DropdownItem key="invite">Invite</DropdownItem>
                                <DropdownItem key="copy" href={siteConfig.paths.profile(friend._id)}>See profile</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger" onClick={onClickDelete}>
                                    Delete Friend
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
