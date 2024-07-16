import { ServerToClientEventsKeys, motionProps } from "@/constants";
import { useCountdown } from "@/hooks/utils";
import { Common, User } from "@/interfaces";
import { useSocketStore } from "@/stores";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";
import { useEffect } from "react";
import MemoizedPlayerList from "../common/player-list";

interface FriendInviteModalProps extends Common.ModalProps {
    friend: User.Detail
    user: User.Detail
    onFriendCancel: () => void
}

const MAX_TIMER = 20

export default function FriendInviteModal({ open = true, friend, user, onClose, onConfirm, onFriendCancel }: FriendInviteModalProps) {
    const { isTimeOut, startTimer, timer, clearTimer } = useCountdown()
    const { socket } = useSocketStore()

    const onClickSubmit = () => {
        onConfirm?.()
        clearTimer()
    }

    useEffect(() => {
        startTimer(MAX_TIMER)
    }, [])

    useEffect(() => {
        if (isTimeOut) {
            onClose?.()
        }
    }, [isTimeOut])

    useEffect(() => {
        if (!socket) return
        socket.on(ServerToClientEventsKeys.match_found_cancel, () => {
            clearTimer()
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
                {(onClose) => (
                    <>
                        <ModalBody>
                            <ModalHeader className="text-[#ecedee] text-center justify-center">Your friend {friend.name} invite you a match!</ModalHeader>
                            <div className="w-full flex items-center justify-center">
                                <MemoizedPlayerList opponent={friend} user={user} showElo />
                            </div>
                        </ModalBody>
                        <ModalFooter className="w-full flex gap-x-3">
                            <Button color="danger" variant="bordered" className="text-slate-100 flex-1" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button className="bg-[#FB2576] text-white flex-1" onPress={onClickSubmit}>
                                Confirm
                                <span className="font-bold tabular-nums">
                                    ({timer})
                                </span>
                            </Button>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
