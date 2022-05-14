import { Ingredient } from '@foodtok-types/ingredient';
import { AxiosResponse } from 'axios';
import base from './base';

interface PostParams {
  RecipeId: number | string;
  UserId: string;
  name: string;
}

const post = (
  payload: PostParams
): Promise<AxiosResponse<{ data: Ingredient }>> =>
  base.post('/ingredients', payload);

export { post };
