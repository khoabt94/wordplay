
import { siteConfig } from '@/configs/site';
import { ClientToServerEventsKeys, QUERY_KEY, ServerToClientEventsKeys } from '@/constants';
import { useCountdown, useHandleRouter, useOpenModal, useToast } from '@/hooks/utils';
import Tables from '@/lib/tables';
import { useAuthStore, useSocketStore, useStateMatch } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import FindForm from '@/lib/find/find-form';
import FriendsList from '@/lib/friends';
import { ServerToClientEvents, Table } from '@/interfaces';
import MatchFoundModal from '@/components/modal/match-found-modal';

export default function FindMatchPage() {
  const { socket } = useSocketStore()
  const queryClient = useQueryClient()
  const { startFindingMatch, endFindingMatch, setTableId, clearTableId } = useStateMatch()
  const { navigate } = useHandleRouter()
  const { open, closeAll } = useOpenModal()
  const { user } = useAuthStore()
  const { toastError } = useToast()

  const onSocketCreateTable: ServerToClientEvents[ServerToClientEventsKeys.create_table] = (table) => {
    setTableId(table.table_id)
    startFindingMatch()
  }

  const onSocketFoundMatch: ServerToClientEvents[ServerToClientEventsKeys.found_match] = ({ table }) => {
    if (!user) return;
    const opponent = table.players.find(p => p.user_id !== user._id)
    const owner = table.players.find(p => p.user_id === user._id)
    open(MatchFoundModal, {
      opponent: opponent?.user,
      user: owner?.user,
      onClose: () => emitSocketCancelMatch(table),
      onConfirm: () => emitSocketAcceptMatch(table),
      onOpponentCancel: () => emitSocketMatchFoundCancel()
    })
  }

  const onSocketJoiningMatch: ServerToClientEvents[ServerToClientEventsKeys.joining_match] = ({ table }) => {
    endFindingMatch()
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.TABLE.GET_TABLES],
      refetchType: 'all'
    })
    closeAll()
    navigate(siteConfig.paths.match(table.table_id))
  }

  const emitSocketAcceptMatch = (table: Table.Detail) => {
    if (!socket || !user) return;
    socket.emit(ClientToServerEventsKeys.accept_match, {
      tableId: table.table_id,
      userId: user._id
    })
  }

  const emitSocketCancelMatch = (table: Table.Detail) => {
    if (!socket) return;
    socket.emit(ClientToServerEventsKeys.cancel_found_match, {
      tableId: table.table_id
    })
    endFindingMatch()
    clearTableId()
    toastError('Match canceled!')
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.TABLE.GET_TABLES],
      refetchType: 'all'
    })
  }

  const emitSocketMatchFoundCancel = () => {
    endFindingMatch()
    clearTableId()
    closeAll()
    toastError('Match canceled!')
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.TABLE.GET_TABLES],
      refetchType: 'all'
    })
  }

  useEffect(() => {
    if (!socket) return;
    socket.on(ServerToClientEventsKeys.create_table, onSocketCreateTable)
    socket.on(ServerToClientEventsKeys.found_match, onSocketFoundMatch)
    socket.on(ServerToClientEventsKeys.joining_match, onSocketJoiningMatch)

    return () => {
      socket.off(ServerToClientEventsKeys.create_table, () => console.log('create_table'));
      socket.off(ServerToClientEventsKeys.found_match, () => console.log('found_match'));
      socket.off(ServerToClientEventsKeys.joining_match, onSocketFoundMatch)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="w-full grid md:grid-cols-[7fr_3fr] grid-cols-1 gap-x-5 h-full pb-4">
      <div className="w-full bg-gray-900 rounded-lg p-4 h-full">
        <h3 className='font-bold text-xl pb-4 border-b-[1px] border-b-gray-700'>Select mode</h3>
        <Suspense>
          <FindForm />
        </Suspense>
        <Suspense>
          <Tables />
        </Suspense>
      </div>
      <div className="w-full bg-gray-900 rounded-lg hidden md:!block p-4 h-full">
        <h3 className='font-bold text-xl pb-4 border-b-[1px] border-b-gray-700'>Your friends</h3>
        <Suspense>
          <FriendsList />
        </Suspense>
      </div>
    </div >
  );
}
