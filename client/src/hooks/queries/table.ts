import { QUERY_KEY } from '@/constants';
import { Api, ReactQuery } from '@/interfaces';
import { getTables } from '@/services/table.services';

import { useQuery } from "@tanstack/react-query";

export const useGetTables = (options?: ReactQuery.Options,) => {
  return useQuery<Api.TableApi.GetTablesResponse>({
    queryKey: [QUERY_KEY.TABLE.GET_TABLES],
    queryFn: getTables,
    ...options
  })
}
