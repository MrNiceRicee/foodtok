import validateJWT from '@middleware/validate';
import { Router } from 'express';
import * as controller from './controller';

const routes = Router();

routes.post('/', validateJWT, controller.create);
routes.get('/', controller.search);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.remove);

export default routes;
