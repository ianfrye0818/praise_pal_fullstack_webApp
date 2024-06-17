import { deleteRemoveLikeKudo, postAddLikeKudo } from '@/api/api-handlers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LikeKudoProps {
  kudoId: string;
  isLiked: boolean;
}

export default function useLikeKudos({ kudoId, isLiked }: LikeKudoProps) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await deleteRemoveLikeKudo(kudoId);
      } else {
        await postAddLikeKudo(kudoId);
      }
    },
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey: ['kudos'] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'] });
    },
  });
  return mutate;
}
