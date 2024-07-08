import { QUERY_KEY } from '@/constants';
import { Api } from '@/interfaces';
import { getMatches, getUsersOnline, updateMyProfile } from '@/services';
import { useAuthStore } from '@/stores';

import { useMutation, useQuery } from "@tanstack/react-query";


export const useGetMatches = ({ user_id }: Api.MatchApi.GetMatchesParams) => {
  return useQuery<Api.MatchApi.GetMatchesResponse>({
    queryKey: [QUERY_KEY.MATCH.GET_MATCHES, { user_id }],
    queryFn: () => getMatches(user_id)
  })
}

