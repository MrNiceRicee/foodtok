import { Request, Response } from 'express';
import { handleError, handleResponse } from '../util/response';
import handleCreate from './create';
import handleSearch from './search';
import handleUpdate from './update';
import handleRemove from './remove';

// const create = (req: Request, res: Response) =>
//   handleCreate(req.header['authorization'], req.body)
//     .then(handleResponse(res, 201))
//     .catch(handleError(res));

const search = (req: Request, res: Response) => {
  return handleSearch(req.query)
    .then(handleResponse(res, 201))
    .catch(handleError(res));
};

const update = (req: Request, res: Response) =>
  handleUpdate(req.header['authorization'], req.body)
    .then(handleResponse(res, 200))
    .catch(handleError(res));

const remove = (req: Request, res: Response) =>
  handleRemove(+req.params.id)
    .then(handleResponse(res, 204))
    .catch(handleError(res));

export { search, update, remove };
