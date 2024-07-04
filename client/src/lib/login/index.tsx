import PasswordInput from "@/components/input/password-input";
import { useAuthActions } from "@/hooks/utils";
import { Api } from "@/interfaces";
import { LoginFormSchema } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Input
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

const LoginForm = () => {
    const { login } = useAuthActions()
    const { control, handleSubmit, formState: { errors } } = useForm<yup.InferType<typeof LoginFormSchema>>({
        resolver: yupResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values: yup.InferType<typeof LoginFormSchema>) => {
        await login(values as Api.AuthApi.LoginPayload)

    }


    return (
        <>

            <div className="gap-5 flex flex-col mt-5">
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
            </div>
            <Button color="primary" onClick={handleSubmit(onSubmit)} className='h-10 w-full mt-5 font-medium'>
                Login
            </Button>

        </>

    )
};

export default LoginForm