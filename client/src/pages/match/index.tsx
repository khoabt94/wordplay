import { useParams } from "react-router-dom"

export default function MatchPage() {
    const { matchId } = useParams()
    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-10">
            Match {matchId}
        </div>
    )
}
