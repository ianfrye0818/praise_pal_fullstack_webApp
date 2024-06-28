import { deleteSingleKudo } from '@/api/api-handlers';
import { TKudos } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteKudoProps {
  companyId: string;
  kudoId: string;
}

export default function useDeleteKudo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ companyId, kudoId }: DeleteKudoProps) =>
      await deleteSingleKudo(companyId, kudoId),
    onMutate: async ({ kudoId }) => {
      const previousKudos = queryClient.getQueryData(['kudos']);
      queryClient.setQueryData(['kudos'], (old: TKudos[]) => {
        return old.filter((kudo: TKudos) => kudo.id !== kudoId);
      });
      return { previousKudos };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['kudos'], context?.previousKudos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'] });
    },
  });

  return mutation;
}
