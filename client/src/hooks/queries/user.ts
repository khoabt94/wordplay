import { QUERY_KEY } from '@/constants';
import { Api } from '@/interfaces';
import { getUsersOnline, updateMyProfile } from '@/services';
import { useAuthStore } from '@/stores';

import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUsersOnline = () => {
  return useQuery<Api.UserApi.GetUsersOnlineResponse>({
    queryKey: [QUERY_KEY.USER.GET_USERS_ONLINE],
    queryFn: getUsersOnline
  })
}

export const useUpdateMyProfile = () => {
  const { setUser } = useAuthStore()
  return useMutation({
    mutationKey: [QUERY_KEY.USER.UPDATE_INFO_ME],
    mutationFn: updateMyProfile,
    onSuccess: (res) => {
      setUser(res.user)
    },
  })
}
