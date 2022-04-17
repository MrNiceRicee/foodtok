import { ApiErrorResponse, ApiResponse } from 'apisauce';
import { search as SearchData } from '../types/search';
import base from './base';

const search = async (): Promise<
  ApiResponse<SearchData, ApiErrorResponse<any>>
> => base.get('/recipes');

export { search };
