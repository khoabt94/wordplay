import { motionProps } from "@/constants";
import { Common, User } from "@/interfaces";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";
import MemoizedPlayerList from "../common/player-list";

interface MatchFoundModalProps extends Common.ModalProps {
    opponent: User.Detail
    user: User.Detail
}

export default function MatchFoundModal({ open = true, opponent, user, onClose, onSubmit }: MatchFoundModalProps) {
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
                            <div className="">
                                <MemoizedPlayerList opponent={opponent} user={user} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" className="text-slate-100" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button className="bg-[#FB2576] text-white" onPress={onSubmit}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
