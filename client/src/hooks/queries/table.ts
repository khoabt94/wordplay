import { QUERY_KEY } from '@/src/constants';
import { Api } from '@/src/interfaces';
import { getTables } from '@/services/table.services';

import { useQuery } from "@tanstack/react-query";

export const useGetTables = () => {
  return useQuery<Api.TableApi.GetTablesResponse>({
    queryKey: [QUERY_KEY.TABLE.GET_TABLES],
    queryFn: getTables
  })
}
