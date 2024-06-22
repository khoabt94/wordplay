import { QUERY_KEY } from '@/constants';
import { Api } from '@/interfaces';
import { getUsersOnline, updateInfoMe } from '@/services';
import { useAuthStore } from '@/stores';

import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUsersOnline = () => {
  return useQuery<Api.UserApi.GetUsersOnlineResponse>({
    queryKey: [QUERY_KEY.USER.GET_USERS_ONLINE],
    queryFn: getUsersOnline
  })
}

export const useUpdateInfoMe = () => {
  const { setUser } = useAuthStore()
  return useMutation({
    mutationKey: [QUERY_KEY.USER.UPDATE_INFO_ME],
    mutationFn: updateInfoMe,
    onSuccess: (res) => {
      setUser(res.user)
    },
  })
}
