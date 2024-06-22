
import { siteConfig } from '@/configs/site';
import { QUERY_KEY, ServerToClientEventsKeys } from '@/constants';
import { useHandleRouter } from '@/hooks/utils';
import Tables from '@/lib/tables';
import { useSocketStore, useStateMatch } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import FindForm from '@/lib/find/find-form';
import FriendsList from '@/lib/friends';
import { Table } from '@/interfaces';

export default function FindMatchPage() {
  const { socket } = useSocketStore()
  const queryClient = useQueryClient()
  const { startFindingMatch, endFindingMatch, setTableId } = useStateMatch()
  const { navigate } = useHandleRouter()

  useEffect(() => {
    if (!socket) return;
    socket.on(ServerToClientEventsKeys.create_table, (table: Table.Detail) => {
      setTableId(table.table_id)
      startFindingMatch()
    })
    socket.on(ServerToClientEventsKeys.join_table, ({ matchId }) => {
      navigate(siteConfig.paths.match(matchId))
      endFindingMatch()

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TABLE.GET_TABLES],
        refetchType: 'all'
      })
    })


    return () => {
      socket.off(ServerToClientEventsKeys.create_table, () => console.log('create-table'));
      socket.off(ServerToClientEventsKeys.join_table, () => console.log('join-table'));
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
