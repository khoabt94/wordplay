import UserAvatar from '@/components/common/user-avatar'
import UserElo from '@/components/common/user-elo'
import { useAuthStore } from '@/stores'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { EllipsisVertical } from 'lucide-react'
import './friend.styles.css'

export default function Friend() {
    const { user } = useAuthStore()
    if (!user) return <></>

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
                            user={user}
                        />
                    </div>
                    <div className="flex justify-between items-center flex-1">
                        <div className="flex flex-col gap-2">
                            <p>John Doe</p>
                            <UserElo
                                user={user}
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
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">Invite</DropdownItem>
                                <DropdownItem key="copy">See profile</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
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
