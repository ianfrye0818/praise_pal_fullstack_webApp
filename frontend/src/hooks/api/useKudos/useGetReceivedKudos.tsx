import { getReceivedKudos } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

interface GetReceivedKudosProps {
  companyId: string;
  userId: string;
}

export default function useGetRecievedKudos({ companyId, userId }: GetReceivedKudosProps) {
  const query = useQuery({
    queryKey: ['kudos', 'received', userId],
    queryFn: async () => await getReceivedKudos(companyId, userId),
    enabled: !!companyId && !!userId,
  });

  return query;
}
