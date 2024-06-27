import { Progress } from "@nextui-org/react";

type Props = {
    value: number
    max: number
    label?: string
}

export default function TimerBar({ value, max, label }: Props) {
    return (
        <Progress
            size="md"
            value={value}
            maxValue={max}
            color="success"
            label={label}
            className="max-w-md text-white"
            classNames={{
                labelWrapper: 'flex justify-center text-center w-full text-inherit'
            }
            }
        />
    )
}
