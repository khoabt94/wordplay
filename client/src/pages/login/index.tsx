import Background from '@/assets/background.png';
import LoginForm from '@/lib/login';
import SignupForm from '@/lib/signup';
import { Tab, Tabs } from '@nextui-org/react';
import { useState } from "react";

enum Mode {
    SIGNUP = 'SIGNUP',
    LOGIN = 'LOGIN'
}
const LoginPage = () => {
    const [mode, setMode] = useState<Mode>(Mode.LOGIN)
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
            <div className="w-[400px] h-[428px]">
                <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={mode}
                    onSelectionChange={(key) => setMode(key as Mode)}
                    color='primary'
                >
                    <Tab key={Mode.LOGIN} title="Login">
                        <LoginForm />
                    </Tab>
                    <Tab key={Mode.SIGNUP} title="Sign up">
                        <SignupForm />
                    </Tab>
                </Tabs>
            </div>

        </div>
    )
};

export default LoginPage