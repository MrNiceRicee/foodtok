import SQL from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';
import { getUrl } from './util';

interface updatePayload {
  name: string;
  description: string;
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
  const { name, description } = updatePayload;
  if (!name && !description)
    throw new ErrorException('missing upload payload', 400);

  const foundRecipe = await findRecipe(id);
  if (!foundRecipe) throw new ErrorException('recipe not found', 404);

  const updated = [];
  const query = SQL`
    UPDATE "Recipes"
    SET
  `;
  if (name) {
    verify(name, { name: 'name' })
      .isString()
      .isLength(2, { operator: 'gte' })
      .isLength(26, { operator: 'lte' });
    if (name.includes(' '))
      throw new ErrorException('cannot have spaces!', 400);
    updated.push('name');
    query.append(SQL`"name"=${name},`);
  }
  if (description) {
    verify(name, { name: 'description' })
      .isString()
      .isLength(240, { operator: 'lte' });
    query.append(SQL`"description"=${description},`);
  }
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

  const data = await queryOne(query.text, query.values);
  return { data, updated };
};

export default update;
