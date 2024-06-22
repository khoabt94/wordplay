import UserAvatar from "@/components/common/user-avatar";
import { ClientToServerEventsKeys, RESULT_MODAL_TYPE, ServerToClientEventsKeys } from "@/constants";
import { User } from "@/interfaces";
import { Match } from "@/interfaces/match";
import { useAuthStore, useSocketStore } from "@/stores"
import { Input } from "@nextui-org/react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import FightIcon from '@/assets/fight-icon.png';
import { useCountdown, useHandleRouter, useOpenModal } from "@/hooks/utils";
import TimerBar from "@/components/common/progress";
import ResultModal from "@/components/modal/result-modal";
import { siteConfig } from "@/configs/site";

const MAX_TIMER = 10

export default function MatchPage() {
    const { socket } = useSocketStore()
    const { user } = useAuthStore()
    const { matchId } = useParams()
    const [match, setMatch] = useState<Match.Detail>()
    const [word, setWord] = useState('')
    const [answer, setAnswer] = useState('')
    const [opponent, setOpponent] = useState<User.Detail>()
    const [isYourTurn, setIsYourTurn] = useState(false)
    const { open } = useOpenModal()
    const { navigate } = useHandleRouter()

    const { isTimeOut, startTimer, timer, clearTimer } = useCountdown()
    const answerRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!socket || !user) return;
        socket.emit(ClientToServerEventsKeys.joined_match, { match_id: matchId as string, user_id: user._id })
        socket.on(ServerToClientEventsKeys.match_start, ({ match, word, user_id_turn }) => {
            setMatch(match)
            setWord(word)
            const opp = match.players.find(p => p.user._id !== user._id)
            setOpponent(opp?.user)
            if (user_id_turn === user._id) {
                setIsYourTurn(true)
            }
            startTimer(MAX_TIMER)
        })
        socket.on(ServerToClientEventsKeys.opponent_answer, (word) => {
            setWord(word)
            clearTimer()
            if (answerRef && answerRef.current) {
                answerRef.current.focus()
            }
            setIsYourTurn(true)
            startTimer(MAX_TIMER)
        })
        socket.on(ServerToClientEventsKeys.match_end, (data) => {
            const result = data.match.result.winner === user._id ? RESULT_MODAL_TYPE.WINNER : RESULT_MODAL_TYPE.LOSER
            open(ResultModal, {
                result,
                onSubmit: () => navigate(siteConfig.paths.findMatch())
            })
            clearTimer()
        })

        return () => {
            socket.off(ServerToClientEventsKeys.match_start, () => console.log('match_start'))
            socket.off(ServerToClientEventsKeys.opponent_answer, () => console.log('opponent_answer'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, answerRef]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (!socket || !user || !match) return;
            socket.emit(ClientToServerEventsKeys.answer, {
                match_id: match.match_id,
                user_id: user._id,
                word: `${word?.split(' ')[1]} ${answer}`.toLowerCase()
            })
            setWord(prev => `${prev?.split(' ')[1]} ${answer}`)
            startTimer(MAX_TIMER)
            setAnswer('')
            setIsYourTurn(false)
        }
    }

    useEffect(() => {
        if (!socket || !user) return;
        if (isTimeOut && isYourTurn) {
            socket.emit(ClientToServerEventsKeys.time_out, { match_id: matchId as string, user_id: user._id })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTimeOut]);


    if (!user || !opponent) return;
    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-10">
            <div className="flex gap-x-8 items-center h-[150px]">
                <div className="flex flex-col gap-y-3 items-center">
                    <UserAvatar user={user} />
                    <span className="text-pink-500 font-bold">{user.name}</span>
                </div>
                <div className=" flex h-auto size-8">
                    <img src={FightIcon} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-y-3 items-center ">
                    <UserAvatar user={opponent} />
                    <span className="text-pink-500 font-bold">{opponent.name}</span>
                </div>
            </div>
            <h3 className="capitalize text-3xl font-bold mb-4">{word}</h3>
            {(timer && isYourTurn) ? (
                <div className=" bg-black z-20 w-full flex justify-center">
                    <div className="w-[250px]" >
                        <TimerBar value={timer} max={MAX_TIMER} />
                    </div>
                </div>
            ) : null}
            <div className="relative">
                {(timer && !isYourTurn) ? (
                    <div className="absolute inset-0 bg-black z-20 w-full flex justify-center">
                        <div className="w-[250px]" >
                            <TimerBar value={timer} max={MAX_TIMER} label="Opponent thinking..." />
                        </div>
                    </div>
                ) : null}
                <div className="flex items-center h-[60px] border-3 border-primary rounded-lg w-[400px] overflow-hidden relative">
                    <div className="bg-gray-50 h-full flex items-center px-3 w-[100px] text-right">
                        <p className="capitalize font-medium text-gray-700 text-2xl text-right w-full block">{word?.split(' ')[1]}</p>
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
                        ref={answerRef}
                        autoFocus
                    />
                </div>
            </div>

        </div>
    )
}
