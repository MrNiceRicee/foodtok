import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';

const findIngredient = async (id: number): Promise<{ _id: number }> =>
  queryOne(
    `
    SELECT "_id"
    FROM "Ingredients"
    WHERE "_id"=$1
  `,
    [id]
  );

const remove = async (id: number) => {
  verify(id, { name: 'id' }).isNumber();
  const foundRecipe = await findIngredient(id);

  if (!foundRecipe) throw new ErrorException('ingredient not found', 404);

  await queryOne('DELETE FROM "Ingredients" WHERE "_id"=$1', [id]);

  return null;
};

export default remove;
