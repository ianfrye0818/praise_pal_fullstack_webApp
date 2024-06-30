import { postCreateKudo } from '@/api/api-handlers';
import { CreateKudoFormProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateKudosCache } from './updateKudoCache';

export default function useCreateKudo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: CreateKudoFormProps) => await postCreateKudo(payload),
    onMutate: (payload) => {
      return updateKudosCache<CreateKudoFormProps & { id: '1' }>({
        companyId: payload.companyId,
        queryClient,
        payload: {
          ...payload,
          id: '1',
        },
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'], exact: false });
    },
  });

  return mutation;
}
