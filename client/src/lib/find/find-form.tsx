import { ClientToServerEventsKeys, MatchLanguage, MatchLanguageOption, MatchMode, MatchModeOption } from "@/constants";
import { useToast } from "@/hooks/utils";
import { useAuthStore, useSocketStore, useStateMatch } from "@/stores";
import { getFirstValueFromSet } from "@/utils/get-value";
import {
    Button,
    Selection,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";

export default function FindForm() {
    const { toastError } = useToast()
    const { startFindingMatch, isFindingMatch, endFindingMatch, clearTableId, tableId } = useStateMatch()
    const { socket } = useSocketStore()
    const { user } = useAuthStore()
    const form = useForm({
        defaultValues: {
            game_mode: MatchMode.FREESTYLE,
            game_language: MatchLanguage.VN
        }
    })

    const onFindMatch = () => {
        if (!socket || !user) return
        const { game_language, game_mode } = form.getValues()

        if (!game_language || !game_mode) {
            toastError('Please choose your match mode/language')
            return;
        }
        startFindingMatch()
        socket.emit(ClientToServerEventsKeys.find_match, {
            game_mode,
            game_language,
            user_id: user?._id || '',
        })
    }

    const onCancelFindMatch = () => {
        if (!socket || !tableId) return
        socket.emit(ClientToServerEventsKeys.cancel_match, {
            tableId
        })
        clearTableId()
        endFindingMatch()
    }

    return <div className="grid grid-cols-2 mt-4 gap-4">
        <Select
            label="Game Mode"
            className="text-xl"
            variant='faded'
            multiple={false}
            selectedKeys={[form.watch('game_mode')]}
            onSelectionChange={(keys: Selection) => {
                if (typeof keys === 'string') return
                form.setValue('game_mode', getFirstValueFromSet(keys) as MatchMode)
            }}

        >
            {MatchModeOption.map(option => (<SelectItem key={option.value}>
                {option.label}
            </SelectItem>))}

        </Select>
        <Select
            label="Game Language"
            className="text-xl"
            variant='faded'
            multiple={false}
            selectedKeys={[form.watch('game_language')]}
            onSelectionChange={(keys: Selection) => {
                if (typeof keys === 'string') return
                form.setValue('game_language', getFirstValueFromSet(keys) as MatchLanguage)
            }}
        >
            {MatchLanguageOption.map(option => (<SelectItem key={option.value}>
                {option.label}
            </SelectItem>))}

        </Select>
        <Button
            className='text-base font-bold uppercase col-span-2 disabled:bg-foreground-400'
            variant='solid'
            color={isFindingMatch ? 'default' : 'primary'}
            radius="sm"
            onClick={isFindingMatch ? onCancelFindMatch : onFindMatch}
        >
            {isFindingMatch ? 'Cancel Match' : 'Find Match'}
        </Button>
    </div>
}
