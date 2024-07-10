import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/player'


export const getPlayerProfile = async (
  { user_id }: Api.PlayerApi.GetPlayerProfileParams
): Promise<Api.PlayerApi.GetPlayerProfileResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/${user_id}/profile`);
};

export const getPlayerMatches = async (
  { user_id }: Api.MatchApi.GetMatchesParams
): Promise<Api.MatchApi.GetMatchesResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/${user_id}/match`);
};



