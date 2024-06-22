import { Api } from "@/src/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/table'

export const getTables = async (
): Promise<Api.TableApi.GetTablesResponse> => {
    return await AxiosInstance.get(`${BASE_URL}/table`);
};

