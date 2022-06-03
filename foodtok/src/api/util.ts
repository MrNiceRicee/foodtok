import axios, { AxiosError } from 'axios';

export const parseError = (error: unknown): string => {
  const catchError = error as Error | AxiosError;
  if (axios.isAxiosError(catchError)) {
    return catchError.response?.data || catchError.message;
  } else {
    return catchError.message;
  }
};
