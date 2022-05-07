import { Request, Response } from 'express';
import { handleError, handleResponse } from '../util/response';
import handleCreate from './create';
import handleSearch from './search';
import handleOne from './one';
import handleUpdate from './update';
import handleRemove from './remove';
import handleAddIngredient from './addIngredient';
import handleRemoveIngredient from './removeIngredient';

const create = (req: Request, res: Response) =>
  handleCreate({ ...req.body, UserId: req.headers['foodtok-user'] })
    .then(handleResponse(res, 201))
    .catch(handleError(res));

const search = (req: Request, res: Response) => {
  return handleSearch(req.query)
    .then(handleResponse(res, 201))
    .catch(handleError(res));
};

const one = (req: Request, res: Response) =>
  handleOne(+req.params.id)
    .then(handleResponse(res, 200))
    .catch(handleError(res));

const update = (req: Request, res: Response) =>
  handleUpdate(+req.params.id, req.body)
    .then(handleResponse(res, 200))
    .catch(handleError(res));

const remove = (req: Request, res: Response) =>
  handleRemove(+req.params.id)
    .then(handleResponse(res, 204))
    .catch(handleError(res));

const addIngredient = (req: Request, res: Response) =>
  handleAddIngredient(+req.params.id, req.body)
    .then(handleResponse(res, 201))
    .catch(handleError(res));

const removeIngredient = (req: Request, res: Response) =>
  handleRemoveIngredient(+req.params.id, req.body)
    .then(handleResponse(res, 204))
    .catch(handleError(res));

export { create, search, one, update, remove, addIngredient, removeIngredient };
