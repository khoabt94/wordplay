
import { siteConfig } from '@/configs/site';
import { ClientToServerEventsKeys, QUERY_KEY, ServerToClientEventsKeys } from '@/constants';
import { useHandleRouter, useOpenModal } from '@/hooks/utils';
import Tables from '@/lib/tables';
import { useAuthStore, useSocketStore, useStateMatch } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import FindForm from '@/lib/find/find-form';
import FriendsList from '@/lib/friends';
import { Table } from '@/interfaces';
import MatchFoundModal from '@/components/modal/match-found-modal';

export default function FindMatchPage() {
  const { socket } = useSocketStore()
  const queryClient = useQueryClient()
  const { startFindingMatch, endFindingMatch, setTableId } = useStateMatch()
  const { navigate } = useHandleRouter()
  const { open } = useOpenModal()
  const { user } = useAuthStore()

  const emitSocketAcceptMatch = (table: Table.Detail) => {
    if (!socket) return;
    socket.emit(ClientToServerEventsKeys.accept_match, {
      tableId: table.table_id
    })
    // set UI to wait for other player acceptance

    // endFindingMatch()
    // queryClient.invalidateQueries({
    //   queryKey: [QUERY_KEY.TABLE.GET_TABLES],
    //   refetchType: 'all'
    // })
    // navigate(siteConfig.paths.match(table.table_id))
  }

  const emitSocketCancelMatch = (table: Table.Detail) => {
    if (!socket) return;
    socket.emit(ClientToServerEventsKeys.cancel_found_match, {
      tableId: table.table_id
    })
    endFindingMatch()
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.TABLE.GET_TABLES],
      refetchType: 'all'
    })
  }

  useEffect(() => {
    if (!socket) return;
    socket.on(ServerToClientEventsKeys.create_table, (table: Table.Detail) => {
      setTableId(table.table_id)
      startFindingMatch()
    })

    socket.on(ServerToClientEventsKeys.found_match, ({ table }) => {
      if (!user) return;
      const opponent = table.players.find(p => p._id !== user._id)
      const owner = table.players.find(p => p._id === user._id)
      open(MatchFoundModal, {
        opponent,
        user: owner,
        onClose: () => emitSocketCancelMatch(table),
        onSubmit: () => emitSocketAcceptMatch(table)
      })
    })




    return () => {
      socket.off(ServerToClientEventsKeys.create_table, () => console.log('create_table'));
      socket.off(ServerToClientEventsKeys.found_match, () => console.log('found_match'));
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
