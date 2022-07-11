import useUser from '@hooks/useUser';
import { AxiosResponse } from 'axios';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from 'react-query';
import { search as SearchData, recipe, justRecipe } from '../types/recipe';
import { parseError } from './util';
import base from './base';

// Routes
const search = async (params?: {
  limit?: number;
  filter?: object;
  cursor?: string;
}): Promise<AxiosResponse<SearchData>> =>
  base.get('/recipes', {
    params,
  });

const one = async (
  id: number | string
): Promise<AxiosResponse<{ data: recipe }>> => base.get(`/recipes/${id}`);

const removeOne = async (
  id: number | string
): Promise<AxiosResponse<{ data: recipe }>> => base.delete(`/recipes/${id}`);

const userRecipe = async (params?: {
  UserId?: string | null;
  limit?: number;
  cursor?: string;
  filter?: object;
}): Promise<AxiosResponse<SearchData>> => base.get('/recipes/user', { params });

const post = async (payload: {
  name: string;
  url: string;
  description: string;
}): Promise<AxiosResponse<{ data: justRecipe }>> =>
  base.post('/recipes', payload);

const put = async (
  id: number | string | undefined,
  payload: {
    name?: string | null;
    description?: string | null;
    url?: string | null;
    Ingredients?: Array<{
      IngredientId: number;
      name?: string;
      servingSize?: number | string | null;
      servingUnit?: string | null;
      edited?: boolean;
      remove?: boolean;
    }>;
  }
): Promise<AxiosResponse<{ data: justRecipe }>> =>
  base.put(`/recipes/${id}`, payload);

const addIngredients = async (
  id: number | string | undefined,
  payload: Array<{ _id: string | number }>
): Promise<AxiosResponse<{ data: string }>> =>
  base.post(`/recipes/${id}/ingredients`, payload);
// hooks

const getRecipes = () => {
  const user = useUser();
  return useQuery(['RecipeList', `${user?.id}`], () => search(), {
    retry: false,
    select: (data) => data.data,
  });
};

const getRecipe = (id: number | string) => {
  const user = useUser();
  return useQuery([`Recipe_${id}`, `${user?.id}`], () => one(id), {
    select: (data) => data.data.data,
  });
};

// eslint-disable-next-line no-unused-vars
type errorFnType = (message: string) => void;

const addRecipe = (errorFn: errorFnType) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: { name: string; url: string; description: string }) =>
      post(payload).then((data) => data.data.data),
    {
      onSuccess: (data) => {
        return queryClient.invalidateQueries([
          'RecipeList',
          `Recipe_${data._id}`,
        ]);
      },
      onError: (err) => {
        errorFn(parseError(err));
      },
    }
  );
};

const removeRecipe = (errorFn?: errorFnType) => {
  const queryClient = useQueryClient();
  return useMutation((payload: string) => removeOne(payload), {
    onSuccess: () => {
      return queryClient.invalidateQueries(['Recipe']);
    },
    onError: (err) => {
      errorFn && errorFn(parseError(err));
    },
  });
};

const searchUserRecipes = ({
  name,
  description,
  UserId,
}: {
  name?: string;
  description?: string;
  UserId: string | null;
}) => {
  return useInfiniteQuery(
    ['RecipeList'],
    async ({ pageParam }) => {
      const payload: { name?: string | object; description?: string | object } =
        {};
      if (name) {
        payload.name = name;
      }
      if (description) {
        payload.description = {
          ILIKE: description,
          OR: true,
        };
      }
      return userRecipe({
        limit: 25,
        cursor: pageParam,
        UserId: UserId,
        filter: payload,
      }).then((item) => item.data);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.cursor : undefined;
      },
      retry: 1,
    }
  );
};

const addRecipeIngredients = (errorFn: errorFnType, RecipeId: string) => {
  const queryClient = useQueryClient();
  const user = useUser();
  return useMutation(
    (payload: Array<{ _id: string | number }>) =>
      addIngredients(RecipeId, payload).then((data) => data.data.data),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([
          `Recipe_${RecipeId}`,
          `${user?.id}`,
        ]);
      },
      onError: (err) => {
        errorFn(parseError(err));
      },
    }
  );
};

const updateRecipe = (
  id: string | number | undefined,
  errorFn: errorFnType
) => {
  const queryClient = useQueryClient();
  const user = useUser();
  return useMutation(
    (payload: {
      name?: string;
      description?: string;
      url?: string;
      Ingredients?: Array<{
        IngredientId: number;
        name?: string;
        servingSize?: number | string | null;
        servingUnit?: string | null;
        edited?: boolean;
        remove?: boolean;
      }>;
    }) => put(id, payload).then((data) => data.data.data),
    {
      onSuccess: async (data) => {
        return queryClient.invalidateQueries([
          'RecipeList',
          `Recipe_${data._id}`,
          `${user?.id}`,
        ]);
      },
      onError: (err) => {
        errorFn(parseError(err));
      },
    }
  );
};

export {
  getRecipes,
  getRecipe,
  search,
  addRecipe,
  updateRecipe,
  addRecipeIngredients,
  searchUserRecipes,
  userRecipe,
  removeRecipe,
};
