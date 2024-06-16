import { getSentKudos } from '@/api/api-handlers';
import { useQuery } from '@tanstack/react-query';

interface GetSentKudosProps {
  companyId: string;
  userId: string;
}

export default function useGetSentKudos({ companyId, userId }: GetSentKudosProps) {
  const query = useQuery({
    queryKey: ['kudos', 'sent', userId],
    queryFn: async () => await getSentKudos(companyId, userId),
    enabled: !!companyId && !!userId,
  });

  return query;
}
