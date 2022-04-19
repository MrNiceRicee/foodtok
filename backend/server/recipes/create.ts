import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { Recipes } from '../../types/Recipes';
import ErrorException from '../util/ErrorException';

interface createPayload {
  UserId: number;
  name: string;
  description: string;
  url: string;
}

const findUser = async (
  id: number
): Promise<{ name: string; url: string }> =>
  queryOne(
    `
    SELECT "name", "url"
    FROM "Users"
    WHERE "_id"=$1
  `,
    [id]
  );

const create = async ({ UserId, name, description, url }: createPayload) => {
  verify(name, { name: 'name' });
  verify(UserId, { name: 'UserId' });

  const foundUser = await findUser(UserId);
  if (!foundUser) throw new ErrorException('User not found', 404);

  const query = SQL`
    INSERT INTO "Recipes"(
      "name",
      "description",
      "url",
      "UserId"
      )
    VALUES(
      ${name},
      ${description},
      ${url},
      ${UserId}
    )
    RETURNING 
      "_id",
      "name",
      "description",
      "url",
      "UserId",
      "createdAt",
      "updatedAt"
    `;

  const data: Recipes = await queryOne(query.text, query.values);

  return { data };
};

export default create;
