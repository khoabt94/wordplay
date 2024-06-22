import { useEffect, useRef, useState } from 'react';

export function useCountdown() {
    const [timer, setTimer] = useState(0);
    const [isTimeOut, setIsTimeOut] = useState(false)
    const interValRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if (timer == 0) return
        interValRef.current = setInterval(() => {
            const next = timer - 1;
            setTimer(next);
            if (next === 0) {
                setIsTimeOut(true)
                clearInterval(interValRef.current)
                interValRef.current = undefined
            }
        }, 1000);

        return () => {
            clearInterval(interValRef.current);
            interValRef.current = undefined
        }
    }, [timer]);

    const startTimer = (val: number) => {
        setTimer(val)
    }

    const clearTimer = () => {
        clearInterval(interValRef.current);
        setTimer(0)
    }

    return {
        timer,
        isTimeOut,
        startTimer,
        clearTimer
    }
}
