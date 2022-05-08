import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { search as SearchData, recipe, justRecipe } from '../types/recipe';
import base from './base';

// Routes
const search = async (): Promise<AxiosResponse<SearchData>> =>
  base.get('/recipes');

const one = async (id: number): Promise<AxiosResponse<{ data: recipe }>> =>
  base.get(`/recipes/${id}`);

const post = async (payload: {
  name: string;
  url: string;
  description: string;
}): Promise<AxiosResponse<{ data: justRecipe }>> =>
  base.post('/recipes', payload);

// hooks
const addRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: { name: string; url: string; description: string }) =>
      post(payload),
    {
      onSuccess: () => queryClient.invalidateQueries(['RecipeList']),
    }
  );
};

const getRecipes = () => {
  return useQuery(['RecipeList'], search, {
    retry: false,
    select: (data) => data.data,
  });
};

// const getInfiniteRecipes = () => {
//   const {data, }
// }

const getRecipe = (id: number) => {
  return useQuery([`Recipe_${id}`], () => one(id), {
    select: (data) => data.data.data,
  });
};

export { getRecipes, getRecipe, addRecipe };
