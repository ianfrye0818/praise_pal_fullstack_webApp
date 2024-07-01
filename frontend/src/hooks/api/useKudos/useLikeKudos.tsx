import { deleteRemoveLikeKudo, postAddLikeKudo } from '@/api/api-handlers';
import { TKudos } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPreviousKudos } from './updateKudoCache';

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
      const { hiddenKudosKey, nonHiddenKudosKey, previousHiddenKudos, previousNonHiddenKudos } =
        getPreviousKudos(queryClient, kudoId);

      if (previousHiddenKudos) {
        queryClient.setQueryData(hiddenKudosKey, (old: TKudos[] | undefined) => {
          if (!old) return [];
          return old.map((kudo) => {
            if (kudoId && kudo.id === kudoId)
              return { ...kudo, likes: isLiked ? kudo.likes - 1 : kudo.likes + 1 };
            return kudo;
          });
        });
      }

      if (previousNonHiddenKudos) {
        queryClient.setQueryData(nonHiddenKudosKey, (old: TKudos[] | undefined) => {
          if (!old) return [];
          return old.map((kudo) => {
            if (kudoId && kudo.id === kudoId)
              return { ...kudo, likes: isLiked ? kudo.likes - 1 : kudo.likes + 1 };
            return kudo;
          });
        });
      }

      return { previousHiddenKudos, previousNonHiddenKudos };

      // queryClient.setQueryData(['kudos'], (old: TKudos[]) => {
      //   return old.map((kudo: TKudos) => {
      //     if (kudo.id === kudoId) {
      //       const isLiked = kudo.userLikes.some((like) => like.userId === userId);
      //       const newUserLikes = isLiked
      //         ? kudo.userLikes.filter((like) => like.userId !== userId)
      //         : [...kudo.userLikes, { userId }];

      //       return {
      //         ...kudo,
      //         likes: isLiked ? kudo.likes - 1 : kudo.likes + 1,
      //         userLikes: newUserLikes,
      //       };
      //     }
      //     return kudo;
      //   });
      // });
      // return { previousKudos };
    },
    onError: (_, variables, context) => {
      if (context?.previousHiddenKudos) {
        queryClient.setQueryData(['kudos', variables.companyId, true], context.previousHiddenKudos);
      }

      if (context?.previousNonHiddenKudos) {
        queryClient.setQueryData(
          ['kudos', variables.companyId, false],
          context.previousNonHiddenKudos
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'], exact: false });
    },
  });
}
