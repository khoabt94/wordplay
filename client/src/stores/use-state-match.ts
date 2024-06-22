import { create } from 'zustand';


type IStateMatch = {
    isFindingMatch: boolean
    startFindingMatch: () => void
    endFindingMatch: () => void
    tableId: string | null
    setTableId: (_table_id: string) => void
    clearTableId: () => void
};

export const useStateMatch = create<IStateMatch>((set) => ({
    isFindingMatch: false,
    tableId: null,
    startFindingMatch: () => set({ isFindingMatch: true }),
    endFindingMatch: () => set({ isFindingMatch: false }),
    setTableId: (tableId: string) => set({ tableId }),
    clearTableId: () => set({ tableId: null })
}));