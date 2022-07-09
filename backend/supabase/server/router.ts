import { Express, Response } from 'express';
import html from 'node:http';
import recipes from './recipes/routes';
import users from './users/routes';
import ingredients from './ingredients/routes';

const router = (app: Express) => {
  app.get('/health', (_, res: Response) => {
    res.status(200).send('Online!');
  });

  app.use('/recipes', recipes);

  app.use('/users', users);

  app.use('/ingredients', ingredients);

  app.all('/*', (_, res: Response) => {
    res.status(501).send(html.STATUS_CODES[501]);
  });
};

export default router;
