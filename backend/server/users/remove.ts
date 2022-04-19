import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';

const findUser = async (id: number): Promise<{ _id: number }> =>
  queryOne(
    `
    SELECT "_id"
    FROM "Users"
    WHERE "_id"=$1
  `,
    [id]
  );

const remove = async (id: number) => {
  verify(id, { name: 'id' }).isNumber();
  const foundRecipe = await findUser(id);

  if (!foundRecipe) throw new ErrorException('user not found', 404);

  await queryOne('DELETE FROM "Users" WHERE "_id"=$1', [id]);

  return null;
};

export default remove;
