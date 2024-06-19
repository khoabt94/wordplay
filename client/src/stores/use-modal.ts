import { create } from 'zustand'

interface ModalState {
    isOpenAuthModal: boolean

    onToggleAuthModal: (_flag: boolean) => void
}

export const useModalStore = create<ModalState>()((set) => ({
    isOpenAuthModal: false,


    onToggleAuthModal: (isOpenAuthModal) => set({ isOpenAuthModal }),
}))