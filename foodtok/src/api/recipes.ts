import { AxiosResponse } from 'axios';
import { search as SearchData, recipe } from '../types/search';
import base from './base';

const search = async (): Promise<AxiosResponse<SearchData>> =>
  base.get('/recipes');

const one = async (id: number): Promise<AxiosResponse<{ data: recipe }>> =>
  base.get(`/recipes/${id}`);

export { search, one };
