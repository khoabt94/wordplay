import { User } from '@/interfaces';
import { create } from 'zustand';

type IAuthStore = {
  user: User.Detail | null
  isFetchingUser: boolean;
  setUser: (_user: User.Detail) => void;
  setIsFetchingUser: (_flag: boolean) => void;
  clearUser: () => void;
};

export const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  isFetchingUser: true,
  setIsFetchingUser: (isFetchingUser: boolean) => set({ isFetchingUser }),
  setUser: (user: User.Detail) => set({ user }),
  clearUser: () => set({ user: null }),
}));
