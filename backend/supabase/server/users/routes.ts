import validateJWT from '@middleware/validate';
import { Router } from 'express';
import * as controller from './controller';

const routes = Router();

// routes.post('/', controller.create);
routes.get('/', validateJWT, controller.search);
routes.get('/:id', validateJWT, controller.one)
routes.put('/', validateJWT, controller.update);
routes.delete('/',validateJWT, controller.remove);

export default routes;
