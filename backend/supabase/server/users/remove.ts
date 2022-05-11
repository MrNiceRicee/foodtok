import supabase from '@util/supabase';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';

const findUser = async (id: string): Promise<{ _id: string }> =>
  queryOne(
    `
    SELECT "_id"
    FROM "Users"
    WHERE "_id"=$1
  `,
    [id]
  );

const remove = async (id: string) => {
  verify(id, { name: 'id' });
  const foundRecipe = await findUser(id);

  if (!foundRecipe) throw new ErrorException('user not found', 404);

  const { error } = await supabase.auth.api.deleteUser(`${foundRecipe._id}`);
  if (error) throw new ErrorException(error.message, error.status);

  return null;
};

export default remove;
