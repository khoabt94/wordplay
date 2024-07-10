import { User } from "@/interfaces";
import { ScrollShadow } from "@nextui-org/react";
import { useMemo } from "react";
import Match from "./match";
import { useGetPlayerMatches } from "@/hooks/queries";

type MatchListProps = {
    user: User.Detail
}

export default function MatchList({ user }: MatchListProps) {
    const { data: dataMatches } = useGetPlayerMatches({ user_id: user?._id || '' })
    const matches = useMemo(() => dataMatches?.matches || [], [dataMatches])
    return (
        <>
            <div className="relative w-full flex items-center justify-between">
                <h3 className="bg-gray-900 block z-10 px-2">Recent matches</h3>
                <div className="absolute h-[0.5px] w-full bg-gray-500 top-1/2 translate-y-1/2" />
            </div>
            <ScrollShadow size={0} hideScrollBar className="mt-2 h-[500px] w-full overflow-x-hidden">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {matches.map((match) => (
                        <Match key={match.match_id} match={match} />
                    ))}
                </div>

            </ScrollShadow>
        </>
    )
}
