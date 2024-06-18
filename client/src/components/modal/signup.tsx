'use client'

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
} from "@nextui-org/react";
import { motionProps } from "@/constants";

export default function SignupModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();                      

    return (
        <>
            <Button variant="solid" color="primary" className="w-full" radius="sm" size="lg" onPress={onOpen}>Signup</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={motionProps}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Signup</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-5">
                                    <Input type="text" label="Name" />
                                    <Input type="text" label="Email" />
                                    <Input type="password" label="Password" />
                                    <Input type="password" label="Confirm Password" />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Signup
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
