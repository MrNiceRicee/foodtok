import { UpdatedUser } from '@foodtok-types/users';
import useUser from '@hooks/useUser';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import base from './base';

interface UpdatePayload {
  displayName: string | undefined;
}
export const update = async (payload: UpdatePayload) =>
  base.put('/users', payload);

const one = async (
  id: string | undefined
): Promise<AxiosResponse<UpdatedUser>> => base.get(`/users/${id}`);

export const getUser = (id: string | undefined) => {
  const user = useUser();
  return useQuery([`User_${id}`, `${user?.id}`], () => one(id), {
    select: (data) => data.data.data,
  });
};

export const updateUser = (id?: string) => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation((updatePayload: UpdatePayload) => update(updatePayload), {
    onSuccess: () => {
      return queryClient.invalidateQueries([
        `User_${id}`,
        `${user?.id}`,
        'RecipeList',
      ]);
    },
  });
};
