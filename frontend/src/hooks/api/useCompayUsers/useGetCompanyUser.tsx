import { getSingleCompanyUser } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

interface UseGetCompanyUserProps {
  companyId: string;
  userId: string;
}

export default function useGetCompanyUser({ companyId, userId }: UseGetCompanyUserProps) {
  const query = useQuery({
    queryKey: ['user', companyId, userId],
    queryFn: async () => getSingleCompanyUser(companyId, userId),
    enabled: !!companyId && !!userId,
  });

  return query;
}
