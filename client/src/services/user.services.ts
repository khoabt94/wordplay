import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/user'

export const getMyProfile = async (
): Promise<Api.UserApi.GetMyProfileResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/my-profile`);
};

export const updateMyProfile = async (
  payload: Api.UserApi.UpdateMyProfilePayload
): Promise<Api.UserApi.UpdateMyProfileResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/my-profile`, payload);
};


export const getUsersOnline = async (
): Promise<Api.UserApi.GetUsersOnlineResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/user-online`);
};

