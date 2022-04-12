import { Request, Response } from 'express';
import { handleError, handleResponse } from '../util/reponse';
import handleCreate from './create';
import handleSearch from './search';
import handleUpdate from './update';
import handleRemove from './remove';
import handleAddIngredient from './addIngredient';
import handleRemoveIngredient from './removeIngredient';

const create = (req: Request, res: Response) =>
  handleCreate(req.body).then(handleResponse(res, 201)).catch(handleError(res));

const search = (req: Request, res: Response) => {
  return handleSearch(req.query)
    .then(handleResponse(res, 201))
    .catch(handleError(res));
};

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

export { create, search, update, remove, addIngredient, removeIngredient };
