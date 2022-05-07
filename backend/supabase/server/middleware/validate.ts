import { NextFunction, Request, Response } from 'express';
import supabase from '@util/supabase';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).send('unauthorized').end();

  const { data, error } = await supabase.auth.api.getUser(token);
  if (error) {
    console.log(error);
    res.status(error.status).send(error.message).end();
    return;
  }

  if (!data)
    return res.status(404).send('could not find associated user').end();

  req['user'] = data;
  req.headers['foodtok-user'] = data.id;
  next();
};

export default validateJWT;
