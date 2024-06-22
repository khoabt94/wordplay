'use client'

import { motionProps } from "@/constants";
import { Common } from "@/interfaces";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";

interface ConfirmModalProps extends Common.ModalProps {
    text: string
}

export default function ConfirmModal({ open = true, text, onClose, onSubmit }: ConfirmModalProps) {

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
                            <ModalHeader className="text-[#ecedee] text-center justify-center">{text}</ModalHeader>
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
    );
}
