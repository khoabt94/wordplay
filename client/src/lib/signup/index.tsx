import PasswordInput from "@/components/input/password-input";
import { SignupFormSchema } from "@/schemas/auth.schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Input
} from "@nextui-org/react";
import { forwardRef, useImperativeHandle } from 'react';
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'

const SignupForm = forwardRef(function SignupFormRef(_props, ref) {
    const { trigger, getValues, control, formState: { errors } } = useForm<yup.InferType<typeof SignupFormSchema>>({
        resolver: yupResolver(SignupFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    })

    useImperativeHandle(ref, () => {
        return {
            getValues: async () => {
                if (await trigger()) {
                    return getValues()
                }
                return null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input
                        type="text"
                        label="Name"
                        isInvalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                        {...field}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        type="text"
                        label="Email"
                        isInvalid={Boolean(errors.email)}
                        errorMessage={errors.email?.message}
                        {...field}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <PasswordInput
                        type="password"
                        label="Password"
                        isInvalid={Boolean(errors.password)}
                        errorMessage={errors.password?.message}
                        {...field}
                    />
                )}
            />

            <Controller
                name="password_confirm"
                control={control}
                render={({ field }) => (
                    <PasswordInput
                        type="password"
                        label="Confirm Password"
                        isInvalid={Boolean(errors.password_confirm)}
                        errorMessage={errors.password_confirm?.message}
                        {...field}
                    />
                )}
            />


        </>
    )
});

export default SignupForm