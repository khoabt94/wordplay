import {
    useDeleteSentFriendRequest,
    useGetReceivedFriendRequests,
    useGetSentFriendRequests,
    useReplyReceivedFriendRequest
} from '@/hooks/queries'
import {
    Accordion,
    AccordionItem,
    DropdownItem,
    DropdownMenu
} from '@nextui-org/react'
import { Check, X } from 'lucide-react'
import { useMemo } from 'react'
import { FriendRequestItem } from '../friend-request-item'

enum FriendRequestAccordionItem {
    RECEIVED_FRIEND_REQUEST = 'RECEIVED_FRIEND_REQUEST',
    SENT_FRIEND_REQUEST = 'SENT_FRIEND_REQUEST',

}

export function FriendRequest() {
    const { data: dataSentFriendRequests } = useGetSentFriendRequests()
    const { data: dataReceivedFriendRequests } = useGetReceivedFriendRequests()
    const { mutateAsync: deleteSentFriendRequest } = useDeleteSentFriendRequest()
    const { mutateAsync: replyReceivedFriendRequest } = useReplyReceivedFriendRequest()
    const sentFriendRequests = useMemo(() => dataSentFriendRequests?.sent_friend_requests || [], [dataSentFriendRequests])
    const receivedFriendRequests = useMemo(() => dataReceivedFriendRequests?.received_friend_requests || [], [dataReceivedFriendRequests])

    return (
        <Accordion selectionMode="multiple" defaultSelectedKeys={[FriendRequestAccordionItem.RECEIVED_FRIEND_REQUEST]}>
            <AccordionItem
                key={FriendRequestAccordionItem.RECEIVED_FRIEND_REQUEST}
                aria-label="Received"
                title="Received"
                classNames={{
                    title: 'text-gray-50',
                }}
            >
                {receivedFriendRequests.length ? receivedFriendRequests.map(friendRequest => (
                    <FriendRequestItem
                        key={friendRequest._id}
                        keyField='sender'
                        friendRequest={friendRequest}
                        render={(friendRequest) => (
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem
                                    key="accept"
                                    onClick={() => replyReceivedFriendRequest({
                                        friend_request_id: friendRequest._id,
                                        is_accepted: true
                                    })}

                                >
                                    <div className='flex items-center gap-x-2'>
                                        <Check color='#22c55e' />
                                        <p className='text-green-500 font-medium'>
                                            Accept
                                        </p>
                                    </div>
                                </DropdownItem>
                                <DropdownItem
                                    key="decline"
                                    onClick={() => replyReceivedFriendRequest({
                                        friend_request_id: friendRequest._id,
                                        is_accepted: false
                                    })}

                                >
                                    <div className='flex items-center gap-x-2'>
                                        <X color='#ef4444' />
                                        <p className='text-red-500 font-medium'>
                                            Decline
                                        </p>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        )}
                    />
                )) : <p className='italic text-center text-gray-400 text-sm'>Not receive any friend request yet</p>}
            </AccordionItem>
            <AccordionItem
                key={FriendRequestAccordionItem.SENT_FRIEND_REQUEST}
                aria-label="Sent"
                title="Sent"
                classNames={{
                    title: 'text-gray-50',
                }}
            >
                {sentFriendRequests.length ? sentFriendRequests.map(friendRequest => (
                    <FriendRequestItem
                        key={friendRequest._id}
                        keyField='receiver'
                        friendRequest={friendRequest}
                        render={(friendRequest) => (
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => deleteSentFriendRequest({ friend_request_id: friendRequest._id })}>
                                    Delete Friend
                                </DropdownItem>
                            </DropdownMenu>
                        )}
                    />)) : <p className='italic text-center text-gray-400 text-sm'>Not send any friend request yet</p>}
            </AccordionItem>
        </Accordion >
    )
}
