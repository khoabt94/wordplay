import Background from '@/assets/background.png';
import { useAuthActions, useToast } from '@/hooks/utils';
import { Api } from '@/interfaces';
import LoginForm from '@/lib/login';
import SignupForm from '@/lib/signup';
import { LoginFormSchema, SignupFormSchema } from '@/schemas/auth.schemas';
import { Button, Switch } from '@nextui-org/react';
import { useRef, useState } from "react";
import * as yup from 'yup';

enum Mode {
    SIGNUP = 'SIGNUP',
    LOGIN = 'LOGIN'
}
const LoginPage = () => {
    const [mode, setMode] = useState<Mode>(Mode.LOGIN)
    const loginFormRef = useRef<{ getValues: () => yup.InferType<typeof LoginFormSchema> }>()
    const signupFormRef = useRef<{ getValues: () => yup.InferType<typeof SignupFormSchema> }>()
    const { signUp, login } = useAuthActions()
    const { toastError } = useToast()

    const onSubmit = async () => {
        const values = mode === Mode.LOGIN ? await loginFormRef.current?.getValues() : await signupFormRef.current?.getValues()
        if (!values) {
            toastError('Empty values')
            return;
        }
        if (mode === Mode.SIGNUP) {
            await signUp(values as Api.AuthApi.SignUpPayload)
        }
        if (mode === Mode.LOGIN) {
            await login(values as Api.AuthApi.LoginPayload)
        }

    }

    return (
        <div
            className='h-screen flex items-center justify-center'
            style={{
                backgroundImage: "url(" + Background + ")",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
        >
            <div className="w-[400px] flex flex-col gap-y-5">
                <div className="flex gap-1 items-center justify-between">
                    <p className='font-bold text-xl'>
                        {mode === Mode.LOGIN ? "Login" : "Signup"}
                    </p>
                    <Switch
                        isSelected={mode === Mode.LOGIN}
                        size="sm"
                        onValueChange={() => setMode(prev => prev === Mode.LOGIN ? Mode.SIGNUP : Mode.LOGIN)}
                    />
                </div>
                <div className="gap-5 flex flex-col">
                    {mode === Mode.LOGIN ? <LoginForm ref={loginFormRef} /> : <SignupForm ref={signupFormRef} />}
                </div>
                <Button color="primary" onPress={onSubmit} className='h-10 font-medium'>
                    {mode === Mode.LOGIN ? "Login" : "Signup"}
                </Button>
            </div>
        </div>
    )
};

export default LoginPage