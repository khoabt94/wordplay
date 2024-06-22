import { Common } from '@/src/interfaces';
import { ElementType } from 'react';
import { create } from 'zustand';

type IModalStore = {
    modals: Common.ModalBaseData[];
    openModal: (_element: ElementType, _props: Common.ModalProps) => void;
    removeAll: () => void;
};

export const useModalStore = create<IModalStore>((set) => ({
    modals: [],

    openModal: (Component, modalProps) => set((state) => ({
        modals: [...state.modals, { Component, modalProps }],
    })),
    removeAll: () => {
        set({ modals: [] });
    },
}));
