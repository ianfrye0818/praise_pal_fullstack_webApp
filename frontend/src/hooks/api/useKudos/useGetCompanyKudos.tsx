import { getCompanyKudos } from '@/api/api-handlers';
import { KudosQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompanyKudos(queryParams: KudosQueryParams) {
  const query = useQuery({
    queryKey: [
      'kudos',
      queryParams.companyId,
      queryParams.receiverId,
      queryParams.senderId,
      queryParams.isHidden,
    ],
    queryFn: async () => {
      console.log('fetching from hook');

      return getCompanyKudos(queryParams);
    },
    enabled: !!queryParams.companyId,
  });

  return query;
}
