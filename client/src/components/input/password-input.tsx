'use client'

import React from "react";
import { Input, InputProps } from "@nextui-org/react";
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput(props: InputProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Input
            endContent={
                <button className="focus:outline-none h-full" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            className="w-full"
            {...props}
            type={isVisible ? "text" : "password"}
        />
    )
}
