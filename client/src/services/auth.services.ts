import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/auth'

export const signup = async (
  payload: Api.AuthApi.SignUpPayload
): Promise<Api.AuthApi.SignupResponse> => {
  return await AxiosInstance.post(`${BASE_URL}/signup`, payload);
};
