import { io, Socket } from "socket.io-client";
import { create } from 'zustand';
import { ClientToServerEvents, ServerToClientEvents } from '../../../server/interfaces/socket'

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>

export const socket = io(import.meta.env.VITE_SOCKET_URL);

type ISocketStore = {
    socket: ClientSocket | null
};

export const useSocketStore = create<ISocketStore>((_set) => ({
    socket,
}));
