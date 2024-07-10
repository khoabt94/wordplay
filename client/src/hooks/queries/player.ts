import { QUERY_KEY } from '@/constants';
import { Api } from '@/interfaces';
import { getPlayerMatches, getPlayerProfile } from '@/services';

import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPlayerProfile = (params: Api.PlayerApi.GetPlayerProfileParams) => {
  return useQuery<Api.PlayerApi.GetPlayerProfileResponse>({
    queryKey: [QUERY_KEY.PLAYER.GET_PLAYER_PROFILE, params],
    queryFn: () => getPlayerProfile(params)
  })
}

export const useGetPlayerMatches = (params: Api.MatchApi.GetMatchesParams) => {
  return useQuery<Api.MatchApi.GetMatchesResponse>({
    queryKey: [QUERY_KEY.MATCH.GET_MATCHES, params],
    queryFn: () => getPlayerMatches(params)
  })
}

