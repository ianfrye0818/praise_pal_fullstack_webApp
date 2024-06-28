import { getCompanyKudos } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompanyKudos(companyId: string) {
  const query = useQuery({
    queryKey: ['kudos'],
    queryFn: async () => {
      console.log('fetching from hook');
      return getCompanyKudos(companyId);
    },
    enabled: !!companyId,
  });

  return query;
}
