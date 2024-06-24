import { postCreateKudo } from '@/api/api-handlers';
import { CreateKudoFormProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateKudo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: CreateKudoFormProps) => await postCreateKudo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'] });
    },
  });

  return mutation;
}

// export default function useCreateKudo() {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: async ({ companyId, payload }) => await postCreateKudo(companyId, payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['kudos'] });
//     },
//   });

//   return mutation;
// }
