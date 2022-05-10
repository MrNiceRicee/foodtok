import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { search as SearchData, recipe, justRecipe } from '../types/recipe';
import base from './base';

// Routes
const search = async (params?: object): Promise<AxiosResponse<SearchData>> =>
  base.get('/recipes', {
    params,
  });

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

  return {
    start: async (payload: {
      name: string;
      url: string;
      description: string;
    }) => {
      let error: null | string = null;
      let data: null | justRecipe = null;
      try {
        const res = await post(payload);
        data = res.data.data;
        queryClient.invalidateQueries('RecipeList');
      } catch (err) {
        const catchError = err as Error | AxiosError;
        if (axios.isAxiosError(catchError)) {
          error = catchError.response?.data || catchError.message;
        } else {
          error = catchError.message;
        }
      }
      return { data, error };
    },
  };
};

const getRecipes = () => {
  return useQuery(['RecipeList'], () => search(), {
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

export { getRecipes, getRecipe, search, addRecipe };
