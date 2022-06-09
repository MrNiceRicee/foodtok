import SQL, { SQLStatement } from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne, getClient } from '../../connection/db';
import ErrorException from '../util/ErrorException';
import { getUrl } from './util';

interface Ingredient {
  IngredientId: number;
  name: string;
  servingSize: number | string | null;
  servingUnit: string | null;
  remove?: boolean;
}

interface updatePayload {
  name: string;
  description: string;
  url: string;
  Ingredients: Array<Ingredient>;
}

const findRecipe = async (
  id: number
): Promise<{ name: string; description: string; url: string }> =>
  queryOne(
    `
    SELECT "name", "description", "url"
    FROM "Recipes"
    WHERE "_id"=$1
  `,
    [id]
  );

const updateRecipeIngredientQuery = (
  RecipeId: number,
  UserId: string,
  IngredientId: number,
  IngredientUpdate: Ingredient,
  res: { _id: number; servingUnit: string; servingSize: number }
) => {
  const query = SQL`
  UPDATE "Recipes_Ingredients"
    SET 
`;
  // only query for mismatch
  if (IngredientUpdate?.servingSize) {
    query.append(SQL` "servingSize"=${IngredientUpdate.servingSize}, `);
  }
  if (IngredientUpdate?.servingUnit) {
    query.append(SQL` "servingUnit"=${IngredientUpdate.servingUnit}, `);
  }
  query.append(SQL`
    "updatedAt"=NOW() 
  WHERE "RecipeId"=${RecipeId} AND
    "IngredientId"=${IngredientId} AND
    "UserId"=${UserId}
  RETURNING
    "servingSize",
    "servingUnit",
    "createdAt",
    "updatedAt"
`);
  // console.log(query.text, '\n', query.values);
  return query;
};

const removeIngredientQuery = (
  RecipeId: number,
  UserId: string,
  IngredientId: number
) => SQL`
  DELETE FROM "Recipes_Ingredients"
    WHERE "RecipeId"=${RecipeId} AND
      "UserId"=${UserId} AND
      "IngredientId"=${IngredientId}
    `;

const findAndCreateRecipeIngredientQuery = async (
  RecipeId: number,
  IngredientId: number,
  UserId: string,
  IngredientUpdate: Ingredient
) => {
  const res: { _id: number; servingUnit: string; servingSize: number } =
    await queryOne(
      `
      SELECT "_id", "servingUnit", "servingSize"
      FROM "Recipes_Ingredients"
      WHERE "RecipeId" = $1 AND
        "IngredientId" = $2 AND
        "UserId" = $3
      LIMIT 1
    `,
      [RecipeId, IngredientId, UserId]
    );
  if (!res) throw new ErrorException('recipe ingredient not found', 404);

  if (IngredientUpdate.remove) {
    return removeIngredientQuery(RecipeId, UserId, IngredientId);
  }
  return updateRecipeIngredientQuery(
    RecipeId,
    UserId,
    IngredientId,
    IngredientUpdate,
    res
  );
};

const createRecipeQuery = async (
  updated: Array<string>,
  {
    name,
    description,
    url,
  }: { name: string; description: string; url: string },
  foundRecipe: { name: string; url: string; description: string }
) => {
  const query = SQL``;
  if (name) {
    verify(name, { name: 'name' })
      .isString()
      .isLength(2, { operator: 'gte' })
      .isLength(26, { operator: 'lte' });
    updated.push('name');
    query.append(SQL`"name"=${name},`);
  }
  if (description) {
    verify(name, { name: 'description' })
      .isString()
      .isLength(240, { operator: 'lte' });
    query.append(SQL`"description"=${description},`);
  }
  if (url && url !== foundRecipe.url) {
    if (
      !url.includes('vm.tiktok.com') &&
      !url.includes('www.tiktok.com') &&
      !url.includes('tiktok')
    )
      throw new ErrorException('url must be from Tiktok', 400);
    let scrubbedURL = url.replace(/\?(?:[\-;:&=\+\$,\w]+)/, '');
    if (!url.match(/([tiktok]\w+)([.com]\w+)\/@(?:[a-zA-z]*)\/video\//)) {
      scrubbedURL = url.replace(/(?:\/\/)(?:www.)/, '//vm.');
    }
    const longUrl = await getUrl(scrubbedURL);
    query.append(SQL`"url"=${url}, "longUrl"=${longUrl},`);
  }
  return query;
};

const createIngredientQueries = async (
  RecipeId: number,
  UserId: string,
  ingredients: Array<Ingredient>
) =>
  Promise.all(
    ingredients.map((item) =>
      findAndCreateRecipeIngredientQuery(
        RecipeId,
        item.IngredientId,
        UserId,
        item
      )
    )
  );

const update = async (
  id: number,
  updatePayload: updatePayload,
  UserId?: string
) => {
  verify(id, { name: 'id' }).isNumber();
  const { name, description, url, Ingredients } = updatePayload;
  if (!name && !description && !url && !Ingredients)
    throw new ErrorException('missing upload payload', 400);

  console.log(updatePayload);
  const foundRecipe = await findRecipe(id);
  if (!foundRecipe) throw new ErrorException('recipe not found', 404);
  if (url && foundRecipe.url && url !== foundRecipe.url)
    throw new ErrorException('url already set', 400);

  // check payload ingredients
  const ingredientQueries = await createIngredientQueries(
    id,
    UserId,
    updatePayload.Ingredients
  );

  const updated = [];
  const query = SQL`
    UPDATE "Recipes"
    SET
  `;
  query.append(await createRecipeQuery(updated, updatePayload, foundRecipe));

  query.append(SQL`
    "updatedAt"=NOW()
    WHERE "_id"=${id}
    RETURNING
      "_id",
      "name",
      "description",
      "url",
      "longUrl"
      "UserId",
      "createdAt",
      "updatedAt"
    `);

  // start transaction
  const client = await getClient();
  await client.query('BEGIN');
  try {
    const recipeUpdate = await queryOne(query.text, query.values);
    const ingredientsUpdate = await Promise.all(
      ingredientQueries.map((statement) =>
        queryOne(statement.text, statement.values)
      )
    );
    await client.query('COMMIT');
    return { data: { recipeUpdate, ingredientsUpdate }, updated };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export default update;
