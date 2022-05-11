import useUser from '@hooks/useUser';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { search as SearchData, recipe, justRecipe } from '../types/recipe';
import base from './base';

// Routes
const search = async (params?: object): Promise<AxiosResponse<SearchData>> =>
  base.get('/recipes', {
    params,
  });

const one = async (id: number): Promise<AxiosResponse<{ data: recipe }>> =>
  base.get(`/recipes/${id}`);

const userRecipe = async (params?: {
  UserId?: string;
  limit?: number;
  cursor?: string;
}): Promise<AxiosResponse<SearchData>> =>
  base.get(`/recipes/user/${params?.UserId}`, { params });

const post = async (payload: {
  name: string;
  url: string;
  description: string;
}): Promise<AxiosResponse<{ data: justRecipe }>> =>
  base.post('/recipes', payload);

// hooks

// eslint-disable-next-line no-unused-vars
type errorFnType = (message: string) => void;

const addRecipe = (errorFn: errorFnType) => {
  const queryClient = useQueryClient();
  const user = useUser();
  return useMutation(
    (payload: { name: string; url: string; description: string }) =>
      post(payload).then((data) => data.data.data),
    {
      onSuccess: (data) => {
        return queryClient.invalidateQueries([
          'RecipeList',
          `Recipe_${data._id}`,
          `${user?.id}`,
        ]);
      },
      onError: (err) => {
        const catchError = err as Error | AxiosError;
        if (axios.isAxiosError(catchError)) {
          if (
            typeof catchError.response?.data === 'string' &&
            catchError.response.data.includes('duplicate')
          ) {
            errorFn('title is already taken');
          } else {
            errorFn(catchError.response?.data || catchError.message);
          }
        } else {
          errorFn(catchError.message);
        }
      },
    }
  );
};

const getRecipes = () => {
  const user = useUser();
  return useQuery(['RecipeList', `${user?.id}`], () => search(), {
    retry: false,
    select: (data) => data.data,
  });
};

// const getInfiniteRecipes = () => {
//   const {data, }
// }

const getRecipe = (id: number) => {
  const user = useUser();
  return useQuery([`Recipe_${id}`, `${user?.id}`], () => one(id), {
    select: (data) => data.data.data,
  });
};

export { getRecipes, getRecipe, search, addRecipe, userRecipe };
