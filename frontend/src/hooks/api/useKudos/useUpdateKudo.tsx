import { patchUpdateKudo } from '@/api/api-handlers';
import { UpdateKudoProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateKudosCache } from './updateKudoCache';

export default function useUpdateKudo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ companyId, payload }: { companyId: string; payload: UpdateKudoProps }) => {
      await patchUpdateKudo(companyId, payload);
    },
    onMutate: async ({ payload, companyId }) => {
      return updateKudosCache<UpdateKudoProps>({
        queryClient,
        companyId,
        payload,
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
