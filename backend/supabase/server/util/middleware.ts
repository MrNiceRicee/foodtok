import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const middleware = (app: Express) => {
  app.use(cors());
  if (import.meta.env.ENV === 'dev') app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  app.use(express.json({ limit: '50mb' }));
};

export default middleware;
