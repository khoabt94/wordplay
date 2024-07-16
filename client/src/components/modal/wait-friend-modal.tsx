import { ServerToClientEventsKeys, motionProps } from "@/constants";
import { Common, User } from "@/interfaces";
import { useSocketStore } from "@/stores";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner
} from "@nextui-org/react";
import { useEffect } from "react";
import MemoizedPlayerList from "../common/player-list";

interface WaitFriendModalProps extends Common.ModalProps {
    friend: User.Detail
    user: User.Detail
    onFriendCancel: () => void
}

export default function WaitFriendModal({ open = true, friend, user, onClose, onFriendCancel }: WaitFriendModalProps) {
    const { socket } = useSocketStore()

    useEffect(() => {
        if (!socket) return
        socket.on(ServerToClientEventsKeys.match_found_cancel, () => {
            onFriendCancel()
        })
    }, [socket])

    return (
        <Modal
            backdrop="blur"
            isOpen={open}
            onOpenChange={(flag) => {
                if (!flag) onClose?.()
            }}
            motionProps={motionProps}
            placement="center"
        >
            <ModalContent className="bg-slate-700 shadow-md">
                {(_onClose) => (
                    <>
                        <ModalBody>
                            <ModalHeader className="text-[#ecedee] text-center justify-center">Your friend {friend.name} invite you a match!</ModalHeader>
                            <div className="w-full flex items-center justify-center">
                                <MemoizedPlayerList opponent={friend} user={user} showElo />
                            </div>
                        </ModalBody>
                        <ModalFooter className="w-full flex gap-x-3">
                            <div className="w-full flex justify-center">
                                <Spinner color="primary" />
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
