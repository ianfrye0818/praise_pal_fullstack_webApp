import { getCompanyUsers } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompanyUsers(companyId: string) {
  const query = useQuery({
    queryKey: ['companyUsers'],
    queryFn: async () => getCompanyUsers(companyId),
    enabled: !!companyId,
  });

  return query;
}
