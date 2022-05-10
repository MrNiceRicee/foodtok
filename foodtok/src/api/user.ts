import { UpdatedUser } from '@foodtok-types/users';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { encode64 } from '@util/utility';
import base from './base';

interface UpdatePayload {
  displayName: string | undefined;
}
export const update = async (payload: UpdatePayload) =>
  base.put('/users', payload);

const one = async (
  id: string | undefined
): Promise<AxiosResponse<UpdatedUser>> => base.get(`/users/${encode64(id)}`);

export const getUser = (id: string | undefined) =>
  useQuery([`User_${id}`], () => one(id), {
    select: (data) => data.data.data,
  });

export const updateUser = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation((updatePayload: UpdatePayload) => update(updatePayload), {
    onSuccess: () => queryClient.invalidateQueries([`User_${id}`]),
  });
};
