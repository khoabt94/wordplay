import { io, Socket } from "socket.io-client";
import { create } from 'zustand';

export const socket = io(import.meta.env.VITE_SOCKET_URL);

type ISocketStore = {
    socket: Socket | null
};

export const useSocketStore = create<ISocketStore>((_set) => ({
    socket,
}));
