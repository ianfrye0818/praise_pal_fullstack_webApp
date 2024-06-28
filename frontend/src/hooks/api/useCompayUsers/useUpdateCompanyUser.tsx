import { patchUpdateUser } from '@/api/api-handlers';
import { updateCurrentUser } from '@/api/auth-actions';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseGetUserProps {
  userToUpdateId: string;
  companyId: string;
  payload: Partial<User>;
  currentUser: User;
}

export default function useUpdateCompanyUser() {
  const { dispatch } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ companyId, userToUpdateId, payload, currentUser }: UseGetUserProps) => {
      if (userToUpdateId === currentUser.userId) {
        return await updateCurrentUser(dispatch, companyId, userToUpdateId, payload);
      } else {
        return await patchUpdateUser(companyId, userToUpdateId, payload);
      }
    },
    onMutate: async (newData: Partial<User>) => {
      await queryClient.cancelQueries({ queryKey: ['companyUsers'] });

      const previousData = queryClient.getQueryData(['companyUsers']);

      queryClient.setQueryData(['companyUsers'], (old: User[]) => {
        return old.map((user: User) => {
          if (user.userId === newData.userId) {
            return {
              ...user,
              ...newData,
            };
          }
          return user;
        });
      });
      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['companyUsers'], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['companyUsers'] });
    },
  });
  return mutation;
}
