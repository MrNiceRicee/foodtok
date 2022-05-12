import SQL from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';
import { getUrl } from './util';

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
  if (url && foundRecipe.url && url !== foundRecipe.url)
    throw new ErrorException('url already set', 400);

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
    updated.push('name');
    query.append(SQL`"name"=${name},`);
  }
  if (description) {
    verify(name, { name: 'description' })
      .isString()
      .isLength(240, { operator: 'lte' });
    query.append(SQL`"description"=${description},`);
  }
  if (url) {
    if (
      !url.includes('vm.tiktok.com') &&
      !url.includes('www.tiktok.com') &&
      !url.includes('tiktok')
    )
      throw new ErrorException('url must be from Tiktok', 400);
    const longUrl = await getUrl(url);
    query.append(SQL`"url"=${url}, "longUrl"=${longUrl},`)
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
