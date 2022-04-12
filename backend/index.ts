import 'dotenv/config';
import express from 'express';
import middleware from './server/util/middleware';
import router from './server/router';

const main = () => {
  const app = express();

  middleware(app);
  router(app);

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
};

main();
