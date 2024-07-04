import { QUERY_KEY, ServerToClientEventsKeys } from "@/constants";
import { useGetUsersOnline } from "@/hooks/queries";
import { User } from "@/interfaces";
import { useSocketStore } from "@/stores";
import { User as UserComponent, ScrollShadow, Tabs, Tab, Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import Friend from "./friend";
import { SmilePlus } from "lucide-react";
import { useOpenModal } from "@/hooks/utils";
import AddFriendModal from "@/components/modal/add-friend-modal";

export default function FriendsList() {
    const { open } = useOpenModal()

    const handleAddFriend = async (email: string) => {
        console.log(email)
    }
    const handleOpenModalAddFriend = () => {
        open(AddFriendModal, {
            onSubmit: (email) => handleAddFriend(email)
        })
    }
    return (
        <div className="w-full bg-gray-900 rounded-lg hidden md:!block p-4 h-full">
            <div className="flex justify-between items-center pb-3">
                <h3 className='font-bold text-xl '>Your friends</h3>
                <Button
                    variant='ghost'
                    radius='full'
                    size='sm'
                    className='!size-10 px-0 min-w-0 border-none'
                    onPress={handleOpenModalAddFriend}
                >
                    <SmilePlus opacity={0.7} />
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
                    <Tab key="online" title="Online" />
                    <Tab key="all" title="All" />
                    <Tab key="request" title="Requests" />
                </Tabs>
                <ScrollShadow hideScrollBar className='flex flex-col gap-y-5 py-4 h-[600px]'>
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                </ScrollShadow>
            </div>
        </div>

    )
}
