import { ServerToClientEventsKeys, motionProps } from "@/constants";
import { useCountdown, useOpenModal } from "@/hooks/utils";
import { Common, User } from "@/interfaces";
import { useSocketStore } from "@/stores";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import MemoizedPlayerList from "../common/player-list";

interface MatchFoundModalProps extends Common.ModalProps {
    opponent: User.Detail
    user: User.Detail
    onOpponentCancel: () => void
}

const MAX_TIMER = 20

export default function MatchFoundModal({ open = true, opponent, user, onClose, onConfirm, onOpponentCancel }: MatchFoundModalProps) {
    const { isTimeOut, startTimer, timer, clearTimer } = useCountdown()
    const { socket } = useSocketStore()

    const [isWaiting, setIsWaiting] = useState(false)
    const onClickSubmit = () => {
        onConfirm?.()
        setIsWaiting(true)
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
            onOpponentCancel()
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
                            <ModalHeader className="text-[#ecedee] text-center justify-center">Match Found!</ModalHeader>
                            <div className="w-full flex items-center justify-center">
                                <MemoizedPlayerList opponent={opponent} user={user} showElo />
                            </div>
                        </ModalBody>
                        <ModalFooter className="w-full flex gap-x-3">
                            {isWaiting ? (
                                <div className="w-full flex justify-center">
                                    <Spinner color="primary" />
                                </div>
                            ) : <>
                                <Button color="danger" variant="bordered" className="text-slate-100 flex-1" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button className="bg-[#FB2576] text-white flex-1" onPress={onClickSubmit}>
                                    Confirm
                                    <span className="font-bold tabular-nums">
                                        ({timer})
                                    </span>
                                </Button>
                            </>}

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
