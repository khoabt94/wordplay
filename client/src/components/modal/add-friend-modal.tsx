'use client'

import { motionProps } from "@/constants";
import { useSendFriendRequest } from "@/hooks/queries";
import { useToast } from "@/hooks/utils";
import { Common } from "@/interfaces";
import { AddFriendFormSchema, ChangeNameFormSchema } from "@/schemas";
import { useAuthStore } from "@/stores";
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

interface EmailModalProps extends Common.ModalProps {

}

export default function AddFriendModal({ open = true, onClose }: EmailModalProps) {
    const { mutateAsync: sendFriendRequest } = useSendFriendRequest()
    const { toastError, toastSuccess } = useToast()
    const { user } = useAuthStore()
    const form = useForm<yup.InferType<typeof AddFriendFormSchema>>({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(AddFriendFormSchema),
        shouldFocusError: true,
    })

    const handleSubmitForm = async (values: yup.InferType<typeof AddFriendFormSchema>) => {
        if (user && user.email === values.email) {
            toastError('Can not send request to yourself!')
            return
        }
        try {
            await sendFriendRequest(values)
            toastSuccess('Friend request sent!')
            onClose?.()
        } catch (error: any) {
            toastError(error.message)
        }
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
                            <ModalHeader className="text-[#ecedee] text-center justify-center">Provide an email to send request</ModalHeader>

                            <Controller
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <Input
                                        className="bg-transparent"
                                        {...field}
                                    />
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
