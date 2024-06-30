import { getCompanyUsers } from '@/api/api-handlers';
import { UserQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompanyUsers(queryParams: UserQueryParams) {
  const query = useQuery({
    queryKey: ['companyUsers'],
    queryFn: async () => getCompanyUsers(queryParams),
    enabled: !!queryParams.companyId,
  });

  return query;
}
