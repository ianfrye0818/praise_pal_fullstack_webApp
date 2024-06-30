import { getCompanyKudos } from '@/api/api-handlers';
import { KudosQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetRecievedKudos(queryParams: KudosQueryParams) {
  const { companyId, receiverId } = queryParams;
  const query = useQuery({
    queryKey: ['kudos', 'received', receiverId],
    queryFn: async () => await getCompanyKudos(queryParams),
    enabled: !!companyId && !!receiverId,
  });

  return query;
}
