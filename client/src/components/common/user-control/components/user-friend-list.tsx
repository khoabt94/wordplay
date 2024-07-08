import Drawer from '@/components/drawer'
import { FriendList } from '@/lib/friends/components'
import { useState } from 'react'
import { Users } from 'lucide-react';
import { Button } from '@nextui-org/react';
import FriendsListSection from '@/lib/friends';

export default function UserFriendList() {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <>
            <Button
                type='button'
                variant='ghost'
                className=' border-none  md:hidden h-[56px] w-[56px] px-0 min-w-0 flex justify-center items-center'
                onClick={() => setOpenDrawer(true)}

            >
                <Users />
            </Button>
            <Drawer
                isOpen={openDrawer}
                onOpenChange={setOpenDrawer}
            >
                <FriendsListSection />
            </Drawer>
        </>
    )
}
