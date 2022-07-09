import express from 'express';
import middleware from './server/util/middleware';
import router from './server/router';

const app = express();

middleware(app);
router(app);

if (process.env.PROD) {
  const port = process.env.VITE_PORT || 8080;
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}

export const viteApp = app;
