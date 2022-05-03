import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne, getClient } from '../../connection/db';
import ErrorException from '../util/ErrorException';

const getIngredientsArray = (ingredients: Array<number>) => {
  if (!ingredients) {
    throw new ErrorException('missing ingredients', 400);
  }
  if (!Array.isArray(ingredients))
    throw new ErrorException('ingredients must be an array', 400);
  return ingredients;
};

const findRecipe = async (id: number): Promise<{ _id: number; name: string }> =>
  queryOne(
    `
    SELECT "_id", "name"
    FROM "Recipes"
    WHERE "_id"=$1
  `,
    [id]
  );

const findIngredients = async (
  id: number
): Promise<{
  _id: number;
}> => {
  if (!id) throw new ErrorException('missing recipe ingredient id', 400);

  const res = await queryOne(
    `
      SELECT *
      FROM "Recipes_Ingredients"
      WHERE "_id"=$1
    `,
    [id]
  );

  if (!res) {
    throw new ErrorException('recipe ingredient not found', 404);
  }
  return res;
};

const removeRecipeIngredient = async (RecipeId: number, IngredientId: number) =>
  queryOne(
    `
    DELETE FROM "Recipes_Ingredients"
    WHERE "RecipeId"=$1
      AND "_id"=$2
  `,
    [RecipeId, IngredientId]
  );

const removeIngredient = async (
  id: number,
  { ingredients }: { ingredients: Array<number> }
) => {
  verify(id, { name: 'id' });
  const ingredientsArray = getIngredientsArray(ingredients);
  const foundRecipe = await findRecipe(id);
  if (!foundRecipe) throw new ErrorException('missing recipe', 404);

  const foundIngredients = await Promise.all(
    ingredientsArray.map((id) => findIngredients(id))
  );

  const client = await getClient();
  try {
    await client.query('BEGIN');
    await Promise.all(
      foundIngredients.map(({ _id: IngredientId }) =>
        removeRecipeIngredient(id, IngredientId)
      )
    );
    await client.query('COMMIT');
    return;
  } catch (err) {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

export default removeIngredient;
