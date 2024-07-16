
import FriendInviteModal from '@/components/modal/friend-invite-modal';
import MatchFoundModal from '@/components/modal/match-found-modal';
import WaitFriendModal from '@/components/modal/wait-friend-modal';
import { siteConfig } from '@/configs/site';
import { ClientToServerEventsKeys, QUERY_KEY, ServerToClientEventsKeys } from '@/constants';
import { useHandleRouter, useOpenModal, useToast } from '@/hooks/utils';
import { ServerToClientEvents, Table } from '@/interfaces';
import FindForm from '@/lib/find/find-form';
import FriendsListSection from '@/lib/friends';
import Tables from '@/lib/tables';
import { useAuthStore, useSocketStore, useStateMatch } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

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

  const onSocketFriendInviteMatch: ServerToClientEvents[ServerToClientEventsKeys.invite_match_by_friend] = ({ table }) => {
    if (!user) return;
    const friend = table.players.find(p => p.user_id !== user._id)
    const owner = table.players.find(p => p.user_id === user._id)
    open(FriendInviteModal, {
      friend: friend?.user,
      user: owner?.user,
      onClose: () => emitSocketCancelMatch(table),
      onConfirm: () => emitSocketAcceptMatch(table),
      onOpponentCancel: () => emitSocketMatchFoundCancel()
    })
  }

  const onSocketWaitFriend: ServerToClientEvents[ServerToClientEventsKeys.wait_for_your_friend] = ({ table }) => {
    if (!user) return;
    const friend = table.players.find(p => p.user_id !== user._id)
    const owner = table.players.find(p => p.user_id === user._id)
    open(WaitFriendModal, {
      friend: friend?.user,
      user: owner?.user,
      onClose: () => emitSocketCancelMatch(table),
      onFriendCancel: () => emitSocketMatchFoundCancel()
    })
  }


  useEffect(() => {
    if (!socket) return;
    socket.on(ServerToClientEventsKeys.create_table, onSocketCreateTable)
    socket.on(ServerToClientEventsKeys.found_match, onSocketFoundMatch)
    socket.on(ServerToClientEventsKeys.joining_match, onSocketJoiningMatch)

    socket.on(ServerToClientEventsKeys.invite_match_by_friend, onSocketFriendInviteMatch)
    socket.on(ServerToClientEventsKeys.wait_for_your_friend, onSocketWaitFriend)
    socket.on(ServerToClientEventsKeys.invite_friend_error, ({ message }) => toastError(message))

    return () => {
      socket.off(ServerToClientEventsKeys.create_table, () => console.log('create_table'));
      socket.off(ServerToClientEventsKeys.found_match, () => console.log('found_match'));
      socket.off(ServerToClientEventsKeys.joining_match, () => console.log('joining_match'))
      socket.off(ServerToClientEventsKeys.invite_match_by_friend, () => console.log('invite_match_by_friend'))
      socket.off(ServerToClientEventsKeys.wait_for_your_friend, () => console.log('wait_for_your_friend'))
      socket.off(ServerToClientEventsKeys.invite_friend_error, () => console.log('invite_friend_error'))
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="w-full grid md:grid-cols-[7fr_300px] grid-cols-1 gap-x-5 h-full pb-4">
      <div className="w-full bg-gray-900 rounded-lg p-4 h-full">
        <h3 className='font-bold text-xl pb-4 border-b-[1px] border-b-gray-700'>Select mode</h3>
        <FindForm />
        <Tables />
      </div>
      <FriendsListSection className='hidden md:!block rounded-lg' />
    </div >
  );
}
