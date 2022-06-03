import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne, queryRows } from '../../connection/db';
import ErrorException from '../util/ErrorException';

const verifyIngredientsArray = (
  ingredients: Array<{
    _id: number;
  }>
): Array<{
  _id: number;
}> => {
  verify(ingredients, { name: 'ingredients' })
    .isArray()
    .isLength(1, { operator: 'gte' });

  return ingredients;
};

const findRecipe = async (id: number): Promise<{ _id: number; name: string }> =>
  queryOne(
    `
    SELECT "_id"
    FROM "Recipes"
    WHERE "_id"=$1
  `,
    [id]
  );

const findIngredients = async (
  RecipeId: string | number,
  {
    _id,
  }: {
    _id: number;
  }
): Promise<{
  _id: number;
}> => {
  if (!_id) throw new ErrorException('missing ingredient id', 400);

  const res = await queryOne(
    `
    SELECT "_id"
    FROM "Ingredients"
    WHERE "_id"=$1
  `,
    [_id]
  );
  if (!res) throw new ErrorException('ingredient not found', 404);

  const duplicate = await queryOne(
    `
    SELECT "_id"
    FROM "Recipes_Ingredients"
    WHERE "RecipeId"=$1 AND
      "IngredientId"=$2
  `,
    [RecipeId, _id]
  );
  if (duplicate) throw new ErrorException('duplicate ingredient', 400);

  return res;
};

const buildIngredientsQuery = (
  id: number,
  UserId: string,
  ingredients: Array<{
    _id: number;
  }>
) =>
  ingredients.reduce((previous, current, index) => {
    previous
      .append(
        SQL` (
      ${id},
      ${current._id},
      ${UserId}
    ) `
      )
      .append(`${index < ingredients.length - 1 ? ',' : ' '}`);
    return previous;
  }, SQL``);

const addIngredient = async (
  id: number,
  UserId: string,
  ingredients: Array<{
    _id: number;
  }>
) => {
  verify(id, { name: 'id' });
  const ingredientsArray = verifyIngredientsArray(ingredients);
  const foundRecipe = await findRecipe(id);

  if (!foundRecipe) throw new ErrorException('recipe not found', 404);

  const foundIngredients = await Promise.all(
    ingredientsArray.map((item) => findIngredients(id, item))
  );

  const ingredientsQuery = buildIngredientsQuery(id, UserId, foundIngredients);

  const query = SQL`
    INSERT INTO "Recipes_Ingredients"(
      "RecipeId",
      "IngredientId",
      "UserId"
    )
    VALUES
  `
    .append(ingredientsQuery)
    .append('RETURNING "_id"');

  console.log(query.text, '\n', query.values);
  const data = await queryRows(query.text, query.values);

  return {
    data: `added ${data.length} recipe(s) to ${foundRecipe.name}`,
  };
};

export default addIngredient;
