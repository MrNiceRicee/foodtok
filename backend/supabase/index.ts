import express from 'express';
import middleware from './server/util/middleware';
import router from './server/router';

const app = express();

middleware(app);
router(app);

// if (import.meta.env.ENV !== 'dev') {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
// }

export const viteApp = app;

// <33