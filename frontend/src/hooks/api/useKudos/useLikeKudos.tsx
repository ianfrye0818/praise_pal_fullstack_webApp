import { deleteRemoveLikeKudo, postAddLikeKudo } from '@/api/api-handlers';
import { KUDOS_QUERY_OPTIONS } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LikeKudoProps {
  kudoId: string;
  companyId: string;
  isLiked: boolean;
  userId: string;
}

export default function useLikeKudos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ isLiked, kudoId }: LikeKudoProps) => {
      if (isLiked) {
        await deleteRemoveLikeKudo(kudoId);
      } else {
        await postAddLikeKudo(kudoId);
      }
    },
    onMutate: async ({ kudoId, isLiked }) => {
      const previousData = queryClient.getQueriesData(KUDOS_QUERY_OPTIONS);

      queryClient.setQueriesData(KUDOS_QUERY_OPTIONS, (old: any) => {
        return old.map((kudo: any) => {
          if (kudo.id === kudoId) {
            return {
              ...kudo,
              isLiked: !isLiked,
              likes: isLiked ? kudo.likes - 1 : kudo.likes + 1,
            };
          }
          return kudo;
        });
      });
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueriesData(KUDOS_QUERY_OPTIONS, context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(KUDOS_QUERY_OPTIONS);
    },
  });
}
