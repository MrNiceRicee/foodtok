import { Ingredient } from '@foodtok-types/ingredient';
import { AxiosResponse } from 'axios';
import base from './base';

interface PostParams {
  UserId: string;
  name: string;
}

const post = (
  payload: PostParams
): Promise<AxiosResponse<{ data: Ingredient }>> =>
  base.post('/ingredients', payload);

const get = (params?: {
  limit?: number;
  filter?: object;
}): Promise<AxiosResponse<{ data: Array<Ingredient> }>> =>
  base.get('/ingredients', {
    params,
  });

export { post, get };
