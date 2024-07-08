import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/match'


export const getMatches = async (
  user_id: string
): Promise<Api.MatchApi.GetMatchesResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/profile/${user_id}/matches`);
};



