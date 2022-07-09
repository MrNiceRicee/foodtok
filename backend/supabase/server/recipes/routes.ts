import validateJWT from '@middleware/validate';
import { Router } from 'express';
import * as controller from './controller';

const routes = Router();

routes.post('/', validateJWT, controller.create);
routes.get('/user/', validateJWT, controller.userRecipe);
routes.get('/:id', controller.one);
routes.get('/', controller.search);
routes.put('/:id', validateJWT, controller.update);
routes.delete('/:id', validateJWT, controller.remove);
routes.post('/:id/ingredients', validateJWT, controller.addIngredient);
routes.delete('/:id/ingredients', validateJWT, controller.removeIngredient);

export default routes;
