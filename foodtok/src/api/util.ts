import axios, { AxiosError } from 'axios';

export const parseError = (error: unknown): string => {
  const catchError = error as Error | AxiosError;
  if (axios.isAxiosError(catchError)) {
    if (
      typeof catchError.response?.data === 'string' &&
      catchError.response.data.includes('duplicate')
    ) {
      return 'title is already taken';
    } else {
      return catchError.response?.data || catchError.message;
    }
  } else {
    return catchError.message;
  }
};
