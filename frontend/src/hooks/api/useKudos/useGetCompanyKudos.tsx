import { getCompanyKudos } from '@/api/api-handlers';
import { KudosQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompanyKudos(queryParams: KudosQueryParams) {
  const query = useQuery({
    queryKey: ['kudos', queryParams.companyId, queryParams.isHidden],
    queryFn: async () => {
      return getCompanyKudos(queryParams);
    },
    enabled: !!queryParams.companyId,
  });

  return query;
}
