import { deleteRemoveLikeKudo, postAddLikeKudo } from '@/api/api-handlers';
import { TKudos } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LikeKudoProps {
  kudoId: string;
  isLiked: boolean;
  userId: string;
}

export default function useLikeKudos({ kudoId, isLiked, userId }: LikeKudoProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await deleteRemoveLikeKudo(kudoId);
      } else {
        await postAddLikeKudo(kudoId);
      }
    },
    onMutate: async () => {
      const previousKudos = queryClient.getQueryData(['kudos']);

      queryClient.setQueryData(['kudos'], (old: TKudos[]) => {
        return old.map((kudo: TKudos) => {
          if (kudo.id === kudoId) {
            const isLiked = kudo.userLikes.some((like) => like.userId === userId);
            const newUserLikes = isLiked
              ? kudo.userLikes.filter((like) => like.userId !== userId)
              : [...kudo.userLikes, { userId }];

            return {
              ...kudo,
              likes: isLiked ? kudo.likes - 1 : kudo.likes + 1,
              userLikes: newUserLikes,
            };
          }
          return kudo;
        });
      });
      return { previousKudos };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['kudos'], context?.previousKudos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'] });
    },
  });
}
