import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne, queryRows } from '../../connection/db';
import ErrorException from '../util/ErrorException';

const getIngredientsArray = (
  ingredients: Array<{
    id: number;
    servingSize: number;
    servingUnit: string;
    description?: string;
  }>
): Array<{
  id: number;
  servingSize: number;
  servingUnit: string;
  description?: string;
}> => {
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

const findIngredients = async ({
  id,
  servingSize,
  servingUnit,
  description,
}: {
  id: number;
  servingSize: number;
  servingUnit: string;
  description?: string;
}): Promise<{
  servingSize: number;
  servingUnit: string;
  _id: number;
  description?: string;
}> => {
  if (!id) throw new ErrorException('missing ingredient id', 400);
  // might as well do object check in here!
  if (!servingSize)
    throw new ErrorException('missing ingredient servingSize', 400);
  if (!servingUnit)
    throw new ErrorException('missing ingredient servingUnit', 400);

  const res = await queryOne(
    `
    SELECT "_id"
    FROM "Ingredients"
    WHERE "_id"=$1
  `,
    [id]
  );
  if (!res) {
    throw new ErrorException('ingredient not found', 404);
  }
  return { servingSize, servingUnit, description, ...res };
};

const buildIngredientsQuery = (
  id: number,
  ingredients: Array<{
    _id: number;
    servingSize: number;
    servingUnit: string;
    description?: string;
  }>
) =>
  ingredients.reduce((previous, current, index) => {
    previous
      .append(
        SQL` (
      ${id},
      ${current._id},
      ${current.servingSize},
      ${current.servingUnit},
      ${current.description}
    ) `
      )
      .append(`${index < ingredients.length - 1 ? ',' : ' '}`);
    return previous;
  }, SQL``);

const addIngredient = async (
  id: number,
  {
    ingredients,
  }: {
    ingredients: Array<{
      id: number;
      servingSize: number;
      servingUnit: string;
      description?: string;
    }>;
  }
) => {
  verify(id, { name: 'id' });
  const ingredientsArray = getIngredientsArray(ingredients);
  const foundRecipe = await findRecipe(id);

  if (!foundRecipe) throw new ErrorException('recipe not found', 404);

  const foundIngredients = await Promise.all(
    ingredientsArray.map((item) => findIngredients(item))
  );

  const ingredientsQuery = buildIngredientsQuery(id, foundIngredients);

  const query = SQL`
    INSERT INTO "Recipes_Ingredients"(
      "RecipeId",
      "IngredientId",
      "servingSize",
      "servingUnit",
      "description"
    )
    VALUES
  `
    .append(ingredientsQuery)
    .append('RETURNING "_id"');

  const data = await queryRows(query.text, query.values);

  return {
    data: `added ${data.length} recipe(s) to ${foundRecipe.name}`,
  };
};

export default addIngredient;
