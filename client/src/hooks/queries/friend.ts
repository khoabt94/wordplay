import { QUERY_KEY, ServerToClientEventsKeys } from '@/constants';
import { Api, ReactQuery, User } from '@/interfaces';
import { deleteFriend, deleteSentFriendRequest, getFriends, getReceivedFriendRequests, getSentFriendRequests, replyReceivedFriendRequest, sendFriendRequest } from '@/services';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetUsersOnline } from './user';
import { useSocketStore } from '@/stores';
import { useEffect, useMemo } from 'react';

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [QUERY_KEY.FRIEND.SEND_FRIEND_REQUEST],
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FRIEND.GET_SENT_FRIEND_REQUEST],
        refetchType: 'all'
      })
    },
  })
}

export const useDeleteSentFriendRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [QUERY_KEY.FRIEND.DELETE_SEND_FRIEND_REQUEST],
    mutationFn: deleteSentFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FRIEND.GET_SENT_FRIEND_REQUEST],
        refetchType: 'all'
      })
    },
  })
}

export const useReplyReceivedFriendRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [QUERY_KEY.FRIEND.REPLY_RECEIVED_FRIEND_REQUEST],
    mutationFn: replyReceivedFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FRIEND.GET_RECEIVED_FRIEND_REQUEST],
        refetchType: 'all'
      })
    },
  })
}

export const useDeleteFriend = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [QUERY_KEY.FRIEND.DELETE_FRIEND],
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FRIEND.GET_FRIENDS],
        refetchType: 'all'
      })
    },
  })
}

export const useGetFriends = (options?: ReactQuery.Options,) => {
  return useQuery<Api.FriendApi.GetFriendsResponse>({
    queryKey: [QUERY_KEY.FRIEND.GET_FRIENDS],
    queryFn: getFriends,
    ...options
  })
}

export const useGetSentFriendRequests = (options?: ReactQuery.Options,) => {
  return useQuery<Api.FriendApi.GetSentFriendRequestResponse>({
    queryKey: [QUERY_KEY.FRIEND.GET_SENT_FRIEND_REQUEST],
    queryFn: getSentFriendRequests,
    ...options
  })
}

export const useGetReceivedFriendRequests = (options?: ReactQuery.Options,) => {
  return useQuery<Api.FriendApi.GetReceivedFriendRequestResponse>({
    queryKey: [QUERY_KEY.FRIEND.GET_RECEIVED_FRIEND_REQUEST],
    queryFn: getReceivedFriendRequests,
    ...options
  })
}

export const useHandleFriendsOnline = () => {
  const { socket } = useSocketStore()
  const { data: dataUsersOnline } = useGetUsersOnline()
  const { data: dataFriends } = useGetFriends()
  const friendsOnline = useMemo(() => {
    if (!dataFriends || dataFriends?.friends.length === 0 || !dataUsersOnline || dataUsersOnline?.users.length === 0) return []
    return dataFriends.friends.filter(friend => !!dataUsersOnline.users.find(user => user._id === friend.friend_info._id))
  }, [dataUsersOnline, dataFriends])
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return;
    socket.on(ServerToClientEventsKeys.number_users_online, ({ users }: { users: User.Detail[] }) => {
      queryClient.setQueryData([QUERY_KEY.USER.GET_USERS_ONLINE], { users })
    })


    return () => {
      socket.off(ServerToClientEventsKeys.number_users_online, () => console.log('numberUsersOnline'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return { friendsOnline }
}
