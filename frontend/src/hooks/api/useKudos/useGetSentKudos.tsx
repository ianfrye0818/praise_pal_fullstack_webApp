import { useQuery } from '@tanstack/react-query';
import { getCompanyKudos } from '@/api/api-handlers';
import { KudosQueryParams } from '@/types';

export default function useGetSentKudos(queryParams: KudosQueryParams) {
  const { companyId, senderId } = queryParams;
  const query = useQuery({
    queryKey: ['kudos', 'sent', senderId],
    queryFn: async () => await getCompanyKudos(queryParams),
    enabled: !!companyId && !!senderId,
  });

  return query;
}
