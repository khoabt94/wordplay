'use client'

import { RESULT_MODAL_TYPE, motionProps } from "@/constants";
import { Common } from "@/interfaces";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";

interface ResultModalProps extends Common.ModalProps {
    result: RESULT_MODAL_TYPE
}

export default function ResultModal({ open = true, result, onClose, onSubmit }: ResultModalProps) {
    const text = result === RESULT_MODAL_TYPE.WINNER ? 'Congrats! You are the winner. Lets beat another opponent!' : "You lose the game. Dont give up!"
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
                            <ModalHeader className="text-[#ecedee] text-center justify-center">{text}</ModalHeader>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="bg-[#FB2576] text-white" onPress={onSubmit}>
                                Okay
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
