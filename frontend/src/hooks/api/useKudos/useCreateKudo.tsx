import { postCreateKudo } from '@/api/api-handlers';
import { CreateKudoFormProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateKudoProps {
  companyId: string;
  payload: CreateKudoFormProps;
}

export default function useCreateKudo({ companyId, payload }: CreateKudoProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await postCreateKudo(companyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'] });
    },
  });

  return mutation;
}
