import { AxiosResponse } from 'axios';
import { search as SearchData, recipe, justRecipe } from '../types/recipe';
import base from './base';

const search = async (): Promise<AxiosResponse<SearchData>> =>
  base.get('/recipes');

const one = async (id: number): Promise<AxiosResponse<{ data: recipe }>> =>
  base.get(`/recipes/${id}`);

const post = async (payload: {
  name: string;
  url: string;
  description: string;
}): Promise<AxiosResponse<justRecipe>> => base.post('/recipes', payload);

export { search, one, post };
