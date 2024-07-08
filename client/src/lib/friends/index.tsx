import AddFriendModal from "@/components/modal/add-friend-modal";
import { useOpenModal } from "@/hooks/utils";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { SmilePlus } from "lucide-react";
import { FriendList, FriendRequest } from "./components";
import { cn } from "@/utils/cn";

type Props = {
    className?: string
}


export default function FriendsListSection({ className }: Props) {
    const { open } = useOpenModal()

    const handleOpenModalAddFriend = () => {
        open(AddFriendModal, {
        })
    }
    return (
        <div className={cn("w-full bg-gray-900  p-4 h-full", className)}>
            <div className="flex justify-between items-center pb-3">
                <h3 className='font-bold text-xl text-gray-50'>Your friends</h3>
                <Button
                    variant='ghost'
                    radius='full'
                    size='sm'
                    className='!size-10 px-0 min-w-0 border-none'
                    onPress={handleOpenModalAddFriend}
                >
                    <SmilePlus opacity={0.7} color="#C0C0C0" />
                </Button>
            </div>
            <div className="">
                <Tabs
                    variant={'bordered'}
                    aria-label="Tabs variants"
                    className="w-full"
                    classNames={{
                        tabList: 'w-full'
                    }}
                >
                    <Tab key="online" title="Online">
                        <FriendList className="h-[600px]" />
                    </Tab>
                    <Tab key="all" title="All" />
                    <Tab key="request" title="Requests">
                        <FriendRequest />
                    </Tab>
                </Tabs>

            </div>
        </div>

    )
}
