import { QUERY_KEY } from '@/constants';
import { Api } from '@/interfaces';
import { getUsersOnline } from '@/services';

import { useQuery } from "@tanstack/react-query";

export const useGetUsersOnline = () => {
  return useQuery<Api.UserApi.GetUsersOnlineResponse>({
    queryKey: [QUERY_KEY.USER.GET_USERS_ONLINE],
    queryFn: getUsersOnline
  })
}
