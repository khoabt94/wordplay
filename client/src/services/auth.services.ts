import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/auth'

export const signup = async (
  payload: Api.AuthApi.SignUpPayload
): Promise<Api.AuthApi.SignupResponse> => {
  return await AxiosInstance.post(`${BASE_URL}/signup`, payload);
};


export const login = async (
  payload: Api.AuthApi.LoginPayload
): Promise<Api.AuthApi.LoginResponse> => {
  return await AxiosInstance.post(`${BASE_URL}/login`, payload);
};


export const refreshToken = async (
): Promise<Api.AuthApi.RefreshTokenResponse> => {
  return await AxiosInstance.post(`${BASE_URL}/refresh-token`);
};

