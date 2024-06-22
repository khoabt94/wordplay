import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/user'

export const getInfoMe = async (
): Promise<Api.UserApi.GetInfoMeResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/get-info-me`);
};


export const getUsersOnline = async (
): Promise<Api.UserApi.GetUsersOnlineResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/get-user-online`);
};

