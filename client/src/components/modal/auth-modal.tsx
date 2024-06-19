'use client'

import React, { useRef, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { motionProps } from "@/constants";
import { useModalStore } from "@/stores";
import LoginForm from "@/lib/login";
import SignupForm from "@/lib/signup";
import { LoginFormSchema, SignupFormSchema } from "@/schemas/auth.schemas";
import * as yup from 'yup'

enum Mode {
    SIGNUP = 'SIGNUP',
    LOGIN = 'LOGIN'
}

export default function AuthModal() {
    const [mode, setMode] = useState<Mode>(Mode.LOGIN)
    const { isOpenAuthModal, onToggleAuthModal } = useModalStore();
    const loginFormRef = useRef<{ getValues: () => yup.InferType<typeof LoginFormSchema> }>()
    const signupFormRef = useRef<{ getValues: () => yup.InferType<typeof SignupFormSchema> }>()

    const onSubmit = async () => {
        const values = mode === Mode.LOGIN ? await loginFormRef.current?.getValues() : await signupFormRef.current?.getValues()
        console.log(values)
    }

    return (
        <>
            <Button variant="solid" color="primary" className="w-fit" radius="sm" size="md" onPress={() => onToggleAuthModal(true)}>Login & Signup</Button>
            <Modal
                isOpen={isOpenAuthModal}
                onOpenChange={onToggleAuthModal}
                motionProps={motionProps}
                backdrop={"blur"}
            >
                <ModalContent className="">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-1 items-center justify-between pt-10">
                                <p>
                                    {mode === Mode.LOGIN ? "Login" : "Signup"}
                                </p>
                                <Switch
                                    isSelected={mode === Mode.LOGIN}
                                    size="sm"
                                    onValueChange={() => setMode(prev => prev === Mode.LOGIN ? Mode.SIGNUP : Mode.LOGIN)}
                                />
                            </ModalHeader>
                            <ModalBody className="gap-5">
                                {mode === Mode.LOGIN ? <LoginForm ref={loginFormRef} /> : <SignupForm ref={signupFormRef} />}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onSubmit}>
                                    {mode === Mode.LOGIN ? "Login" : "Signup"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </>
    );
}
