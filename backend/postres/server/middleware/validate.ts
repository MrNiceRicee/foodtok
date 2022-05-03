import { NextFunction, Request, Response } from 'express';
import supabase from '@util/supabase';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    res.status(401).send('unauthorized').end();
    return;
  }
  const { data, error } = await supabase.auth.api.getUser(token);
  if (error) {
    res.status(500).send('try again').end();
    return;
  }
  if (!data) {
    res.status(404).send('could not find associated user').end();
    return;
  }
  req['user'] = data;
  req.headers['foodtok-user'] = data.id;
  next();
};

export default validateJWT;
