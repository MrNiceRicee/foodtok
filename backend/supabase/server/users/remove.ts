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
  console.log('id', id);
  verify(id, { name: 'id' });
  const foundRecipe = await findUser(id);

  if (!foundRecipe) throw new ErrorException('user not found', 404);

  const { error, data } = await supabase.auth.api.deleteUser(`${foundRecipe._id}`);
  if (error) {
    console.log(error);
    throw new ErrorException(error.message, error.status);
  }

  console.log(data);
  await queryOne('DELETE FROM "Users" WHERE "_id"=$1', [id]);

  return null;
};

export default remove;
