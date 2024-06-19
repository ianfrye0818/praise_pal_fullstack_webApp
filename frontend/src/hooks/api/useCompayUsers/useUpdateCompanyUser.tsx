import { patchUpdateUser } from '@/api/api-handlers';
import { User } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseGetUserProps {
  userId: string;
  companyId: string;
  payload: Partial<User>;
}

export default function useUpdateCompanyUser({ userId, companyId, payload }: UseGetUserProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => patchUpdateUser(companyId, userId, payload),
    //optimistic update
    onMutate: async (newData: Partial<User>) => {
      await queryClient.cancelQueries({ queryKey: ['user', companyId, userId] });

      const previousData = queryClient.getQueryData(['user', companyId, userId]);

      queryClient.setQueryData(['user', companyId, userId], (old: User) => {
        return { ...old, ...newData };
      });
      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['user', companyId, userId], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', companyId, userId] });
    },
  });
  return mutation;
}
