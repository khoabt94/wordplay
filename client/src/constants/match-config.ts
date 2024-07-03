import { ReactNode } from "react"

export enum MatchMode {
    FREESTYLE = 'freestyle',
    NON_REPEAT = 'non-repeat'
}

export enum MatchLanguage {
    VN = 'vn',
    EN = 'en'
}

export type IMatchModeOption = {
    value: MatchMode
    label: string
}

export const MatchModeOption: IMatchModeOption[] = [
    {
        label: 'Freestyle',
        value: MatchMode.FREESTYLE
    },
    {
        label: 'Non-repeat',
        value: MatchMode.NON_REPEAT
    },
]



export type IMatchLanguageOption = {
    value: MatchLanguage
    label: string
    icon: string
}

export const MatchLanguageOption: IMatchLanguageOption[] = [
    {
        label: 'VN',
        value: MatchLanguage.VN,
        icon: '/vn.png'
    },
    {
        label: 'EN',
        value: MatchLanguage.EN,
        icon: '/en.png'
    },
]