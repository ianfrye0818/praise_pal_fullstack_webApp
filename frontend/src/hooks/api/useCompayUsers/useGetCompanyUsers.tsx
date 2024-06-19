import { getCompanyUsers } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

interface UseGetCompanyUsersProps {
  companyId: string;
}

export default function useGetCompanyUsers({ companyId }: UseGetCompanyUsersProps) {
  const query = useQuery({
    queryKey: ['companyUsers'],
    queryFn: async () => getCompanyUsers(companyId),
    enabled: !!companyId,
  });

  return query;
}
