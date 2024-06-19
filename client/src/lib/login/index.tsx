import PasswordInput from "@/components/input/password-input";
import { LoginFormSchema } from "@/schemas/auth.schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Input
} from "@nextui-org/react";
import { forwardRef, useImperativeHandle } from 'react';
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'

const LoginForm = forwardRef(function LoginFormRef(_props, ref) {
    const { control, trigger, getValues, formState: { errors } } = useForm<yup.InferType<typeof LoginFormSchema>>({
        resolver: yupResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: ''
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
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        type="email"
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

        </>
    )
});

export default LoginForm