import { QUERY_KEY } from '@/constants';
import { Api, ReactQuery } from '@/interfaces';
import { deleteFriend, deleteSentFriendRequest, getFriends, getReceivedFriendRequests, getSentFriendRequests, replyReceivedFriendRequest, sendFriendRequest } from '@/services';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
