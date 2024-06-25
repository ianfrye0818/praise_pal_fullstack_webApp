import { deleteSingleKudo } from '@/api/api-handlers';
import { TKudos } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteKudoProps {
  companyId: string;
  kudoId: string;
}

export default function useDeleteKudo({ companyId, kudoId }: DeleteKudoProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await deleteSingleKudo(companyId, kudoId),
    onMutate: async () => {
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
