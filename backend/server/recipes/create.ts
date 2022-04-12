import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import Recipes from '../../types/Recipes';
import ErrorException from '../util/ErrorException';

interface createPayload {
  CreatorId: number;
  name: string;
  description: string;
  url: string;
}

const findCreator = async (
  id: number
): Promise<{ name: string; url: string }> =>
  queryOne(
    `
    SELECT "name", "url"
    FROM "Creators"
    WHERE "_id"=$1
  `,
    [id]
  );

const create = async ({ CreatorId, name, description, url }: createPayload) => {
  verify(name, { name: 'name' });
  verify(CreatorId, { name: 'CreatorId' });

  const foundCreator = await findCreator(CreatorId);
  if (!foundCreator) throw new ErrorException('creator not found', 404);

  const query = SQL`
    INSERT INTO "Recipes"(
      "name",
      "description",
      "url",
      "CreatorId"
      )
    VALUES(
      ${name},
      ${description},
      ${url},
      ${CreatorId}
    )
    RETURNING 
      "_id",
      "name",
      "description",
      "url",
      "CreatorId",
      "createdAt",
      "updatedAt"
    `;

  const data: Recipes = await queryOne(query.text, query.values);

  return { data };
};

export default create;
