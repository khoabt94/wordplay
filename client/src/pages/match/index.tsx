import TimerBar from "@/components/common/progress";
import ResultModal from "@/components/modal/result-modal";
import { siteConfig } from "@/configs/site";
import { ClientToServerEventsKeys, RESULT_MODAL_TYPE, ServerToClientEventsKeys } from "@/constants";
import { useCountdown, useHandleRouter, useOpenModal } from "@/hooks/utils";
import { ServerToClientEvents, User, Match } from "@/interfaces";
import { useAuthStore, useSocketStore } from "@/stores";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AnswerBox from "./components/answer-box";
import Histories from "./components/histories";
import MemoizedPlayerList from "@/components/common/player-list";

const MAX_TIMER = 10

export default function MatchPage() {
    const { socket } = useSocketStore()
    const { user, getUser } = useAuthStore()
    const { matchId } = useParams()
    const [match, setMatch] = useState<Match.Detail>()
    const [word, setWord] = useState('')
    const [opponent, setOpponent] = useState<User.Detail>()
    const [isYourTurn, setIsYourTurn] = useState(false)
    const [histories, setHistories] = useState<Match.History[]>([])
    const { open } = useOpenModal()
    const { navigate } = useHandleRouter()
    const { isTimeOut, startTimer, timer, clearTimer } = useCountdown()
    const answerRef = useRef<HTMLInputElement>(null)

    const handlePushHistory = (newHis: Omit<Match.History, 'order'>) => {
        setHistories(prev => {
            const nextOrder = prev.length
            return [...prev, { ...newHis, order: nextOrder }]
        })
    }

    const onSocketMatchStart: ServerToClientEvents[ServerToClientEventsKeys.match_start] = ({ match, word, user_id_turn }) => {
        if (!user) return;

        setMatch(match)
        setWord(word)
        const opp = match.players.find(p => p._id !== user._id)

        setOpponent(opp)
        if (user_id_turn === user._id) {
            setIsYourTurn(true)
        }
        handlePushHistory(
            {
                answer: word,
                isValid: true,
                player: null
            }
        )
        startTimer(MAX_TIMER)
    }

    const onSocketOpponentAnswer: ServerToClientEvents[ServerToClientEventsKeys.opponent_answer] = (word) => {
        setWord(word)
        clearTimer()
        if (answerRef && answerRef.current) {
            answerRef.current.focus()
        }
        handlePushHistory(
            {
                answer: word,
                isValid: true,
                player: opponent?._id as string
            }
        )
        setIsYourTurn(true)
        startTimer(MAX_TIMER)
    }

    const onSocketMatchEnd: ServerToClientEvents[ServerToClientEventsKeys.match_end] = (data) => {
        if (!user) return;
        const result = data.match.result.winner === user._id ? RESULT_MODAL_TYPE.WINNER : RESULT_MODAL_TYPE.LOSER
        open(ResultModal, {
            result,
            onSubmit: () => navigate(siteConfig.paths.findMatch())
        })
        getUser()
        clearTimer()
    }

    const onSubmitAnswer = (secondWord: string) => {
        if (!socket || !user || !match) return;
        const wordSubmit = `${word?.split(' ')[1]} ${secondWord}`
        socket.emit(ClientToServerEventsKeys.answer, {
            match_id: match.match_id,
            user_id: user._id,
            word: wordSubmit.toLowerCase()
        })
        setWord(prev => `${prev?.split(' ')[1]} ${secondWord}`)
        startTimer(MAX_TIMER)
        setIsYourTurn(false)
        handlePushHistory(
            {
                answer: wordSubmit,
                isValid: true,
                player: user._id
            }
        )
    }

    useEffect(() => {
        if (!socket || !user) return;
        socket.emit(ClientToServerEventsKeys.joined_match, { match_id: matchId as string, user_id: user._id })
        socket.on(ServerToClientEventsKeys.match_start, onSocketMatchStart)
        socket.on(ServerToClientEventsKeys.opponent_answer, onSocketOpponentAnswer)
        socket.on(ServerToClientEventsKeys.match_end, onSocketMatchEnd)

        return () => {
            socket.off(ServerToClientEventsKeys.match_start, () => console.log('match_start'))
            socket.off(ServerToClientEventsKeys.opponent_answer, () => console.log('opponent_answer'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, answerRef]);



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
            <MemoizedPlayerList opponent={opponent} user={user} />
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
                <AnswerBox
                    firstWord={word?.split(' ')[1]}
                    onSubmitAnswer={onSubmitAnswer}
                    ref={answerRef}
                />
            </div>
            <div className="mt-6">
                <Histories histories={histories} user_id={user._id} />
            </div>
        </div>
    )
}
