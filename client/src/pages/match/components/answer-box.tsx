import { useToast } from '@/hooks/utils'
import { Input } from '@nextui-org/react'
import React, { KeyboardEvent, forwardRef, useState } from 'react'

type Props = {
    firstWord: string
    onSubmitAnswer: (_secondWord: string) => void
}


const AnswerBox = forwardRef(function AnswerBoxRef({ firstWord, onSubmitAnswer }: Props, ref: React.Ref<HTMLInputElement>) {
    const [answer, setAnswer] = useState('')
    const { toastError } = useToast()

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (answer.length > 0) onSubmitAnswer(answer)
            else toastError('Please type your answer!')
            setAnswer('')
        }
    }

    return (
        <div className="flex items-center h-[60px] border-3 border-primary rounded-lg w-[400px] overflow-hidden relative">
            <div className="bg-gray-50 h-full flex items-center px-3 w-[100px] text-right">
                <p className="capitalize font-medium text-gray-700 text-2xl text-right w-full block">{firstWord}</p>
            </div>
            <Input
                className="flex-1 h-full"
                classNames={{
                    inputWrapper: ' h-full text-2xl ',
                    innerWrapper: ' h-full text-2xl ',
                    mainWrapper: ' h-full text-2xl ',
                    input: ' h-full text-2xl '
                }}
                radius="none"
                value={answer}
                onValueChange={setAnswer}
                onKeyDown={handleKeyDown}
                ref={ref}
                autoFocus
            />
        </div>
    )
});

export default AnswerBox