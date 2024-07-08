import { User } from "@/interfaces";
import { ReactNode } from "react";
import MatchList from "./components/match-list";

type LayoutProfileProps = {
    user: User.Detail | undefined
    isOwnProfile: boolean
    children: ReactNode
}
export default function LayoutProfile({ user, children }: LayoutProfileProps) {
    if (!user) return <></>
    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-5">
            {children}
            <MatchList user={user} />
        </div>
    )
}
