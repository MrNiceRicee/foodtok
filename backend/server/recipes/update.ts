import SQL from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';

interface updatePayload {
  name: string;
  description: string;
  url: string;
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

const update = async (id: number, updatePayload: updatePayload) => {
  verify(id, { name: 'id' }).isNumber();
  const { name, description, url } = updatePayload;
  if (!name && !description && !url)
    throw new ErrorException('missing upload payload', 400);

  const foundRecipe = await findRecipe(id);
  if (!foundRecipe) throw new ErrorException('recipe not found', 404);

  const updated = [];
  const query = SQL`
    UPDATE "Recipes"
    SET
  `;
  if (name) {
    updated.push('name');
    query.append(SQL`"name"=${name},`);
  }
  if (description) {
    updated.push('description');
    query.append(SQL`"description"=${description},`);
  }
  if (url) {
    updated.push('url');
    query.append(SQL`"url"=${url},`);
  }
  query.append(SQL`
    "updatedAt"=NOW()
    WHERE "_id"=${id}
    RETURNING
      "_id",
      "name",
      "description",
      "url",
      "CreatorId",
      "createdAt",
      "updatedAt"
    `);

  const data = await queryOne(query.text, query.values);
  return { data, updated };
};

export default update;
