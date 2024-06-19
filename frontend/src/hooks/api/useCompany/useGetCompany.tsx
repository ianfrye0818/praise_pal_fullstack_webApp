import { getCompany } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

interface UseGetCompanyProps {
  companyId: string;
}

export default function useGetCompany({ companyId }: UseGetCompanyProps) {
  const query = useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => getCompany(companyId),
    enabled: !!companyId,
  });

  return query;
}
