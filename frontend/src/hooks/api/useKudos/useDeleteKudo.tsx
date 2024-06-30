import { deleteSingleKudo } from '@/api/api-handlers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateKudosCache } from './updateKudoCache';
import { UpdateKudoProps } from '@/types';

interface DeleteKudoProps {
  companyId: string;
  kudoId: string;
}

export default function useDeleteKudo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ companyId, kudoId }: DeleteKudoProps) =>
      await deleteSingleKudo(companyId, kudoId),
    onMutate: async ({ kudoId, companyId }) => {
      return updateKudosCache<UpdateKudoProps>({
        queryClient,
        kudoId,
        companyId,
      });
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
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: ['kudos', companyId], exact: false });
    },
  });

  return mutation;
}
