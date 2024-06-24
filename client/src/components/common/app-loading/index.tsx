import { cn } from '@/utils/cn'
import './app-loading.styles.css'

type Props = {
    className?: string
}

export default function AppLoading({ className = '' }: Props) {
    return (
        <div className={cn(" w-full flex items-center justify-center bg-black", className)}>
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
        </div>

    )
}
