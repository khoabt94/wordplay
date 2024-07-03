'use client'

import { motionProps } from "@/constants";
import { Common } from "@/interfaces";
import { ChangeNameFormSchema } from "@/schemas/auth.schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'

interface ChangeNameModalProps extends Common.ModalProps {
    initialValue: string
}

export default function ChangeNameModal({ open = true, initialValue, onClose, onSubmit }: ChangeNameModalProps) {
    const form = useForm<yup.InferType<typeof ChangeNameFormSchema>>({
        defaultValues: {
            name: initialValue || '',
        },
        resolver: yupResolver(ChangeNameFormSchema),
        shouldFocusError: true,
    })

    const handleSubmitForm = (values: yup.InferType<typeof ChangeNameFormSchema>) => {
        onSubmit?.(values.name)
    }

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
                            <ModalHeader className="text-[#ecedee] text-center justify-center">Change your display name</ModalHeader>

                            <Controller
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <Input className="mt-5"  {...field} />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" className="text-slate-100" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button className="bg-[#FB2576] text-white" onClick={form.handleSubmit(handleSubmitForm)}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
