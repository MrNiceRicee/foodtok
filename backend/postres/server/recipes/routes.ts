import { Router } from 'express';
import * as controller from './controller';

const routes = Router();

routes.post('/', controller.create);
routes.get('/:id', controller.one);
routes.get('/', controller.search);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.remove);
routes.post('/:id/ingredients', controller.addIngredient);
routes.delete('/:id/ingredients', controller.removeIngredient);

export default routes;
