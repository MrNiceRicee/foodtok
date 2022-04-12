import express from 'express';
import middleware from './server/util/middleware';
import router from './server/router';

const app = express();

middleware(app);
router(app);

export const viteApp = app;
