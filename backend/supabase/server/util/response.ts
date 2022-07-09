import { Response } from 'express';
import ErrorException from './ErrorException';

const handleError = (res: Response, statusCode: number = 500) => {
  return (err: ErrorException | Error) => {
    if ('statusCode' in err) statusCode = err.statusCode;

    if (import.meta.env.ENV === 'dev') console.error('error - ', err);

    return res.status(statusCode).send(err.message || err);
  };
};

const handleResponse = (res: Response, statusCode: number = 200) => {
  return (message: any = '') => res.status(statusCode).send(message);
};

export { handleError, handleResponse };
