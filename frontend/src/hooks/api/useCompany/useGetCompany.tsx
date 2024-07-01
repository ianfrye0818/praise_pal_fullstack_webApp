import { getCompany } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompany(companyId: string) {
  const query = useQuery({
    queryKey: ['company'],
    queryFn: async () => getCompany(companyId),
    enabled: !!companyId,
  });

  return query;
}
