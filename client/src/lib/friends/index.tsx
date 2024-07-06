import AddFriendModal from "@/components/modal/add-friend-modal";
import { useOpenModal } from "@/hooks/utils";
import { Accordion, AccordionItem, Button, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { SmilePlus } from "lucide-react";
import { FriendItem, FriendList, FriendRequest } from "./components";

export default function FriendsList() {
    const { open } = useOpenModal()

    const handleOpenModalAddFriend = () => {
        open(AddFriendModal, {
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
                    <Tab key="online" title="Online">
                        <FriendList />
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
