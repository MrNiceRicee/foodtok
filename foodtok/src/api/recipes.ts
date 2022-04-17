import { ApiErrorResponse, ApiResponse } from 'apisauce';
import { search as SearchData, recipe } from '../types/search';
import base from './base';

const search = async (): Promise<
  ApiResponse<SearchData, ApiErrorResponse<any>>
> => base.get('/recipes');

const one = async (
  id: number
): Promise<ApiResponse<recipe, ApiErrorResponse<any>>> =>
  base.get(`/recipes/${id}`);

export { search, one };
