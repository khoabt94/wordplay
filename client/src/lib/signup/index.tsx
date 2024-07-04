import PasswordInput from "@/components/input/password-input";
import { useAuthActions } from "@/hooks/utils";
import { Api } from "@/interfaces";
import { SignupFormSchema } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Input
} from "@nextui-org/react";
import { forwardRef } from 'react';
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

const SignupForm = forwardRef(function SignupFormRef(_props, ref) {
    const { signUp } = useAuthActions()

    const { control, handleSubmit, formState: { errors } } = useForm<yup.InferType<typeof SignupFormSchema>>({
        resolver: yupResolver(SignupFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    })


    const onSubmit = async (values: yup.InferType<typeof SignupFormSchema>) => {
        await signUp(values as Api.AuthApi.SignUpPayload)

    }


    return (
        <>
            <div className="gap-5 flex flex-col mt-5">
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
            </div>
            <Button color="primary" onClick={handleSubmit(onSubmit)} className='h-10  w-full mt-5 font-medium'>
                Signup
            </Button>



        </>
    )
});

export default SignupForm