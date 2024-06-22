import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/user'

export const getInfoMe = async (
): Promise<Api.UserApi.GetInfoMeResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/info-me`);
};

export const updateInfoMe = async (
  payload: Api.UserApi.UpdateInfoMePayload
): Promise<Api.UserApi.UpdateInfoMeResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/info-me`, payload);
};


export const getUsersOnline = async (
): Promise<Api.UserApi.GetUsersOnlineResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/user-online`);
};

