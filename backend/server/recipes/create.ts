import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { Recipes } from '../../types/Recipes';
import ErrorException from '../util/ErrorException';
import { getUrl } from './util';

interface createPayload {
  UserId: number;
  name: string;
  description: string;
  url: string;
}

const findUser = async (id: number): Promise<{ name: string; url: string }> =>
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

  let longUrl = '';
  if (url) {
    longUrl = await getUrl(url);
    console.log(longUrl);
  }

  const query = SQL`
    INSERT INTO "Recipes"(
      "name",
      "description",
      "url",
      "UserId",
      "longUrl"
      )
    VALUES(
      ${name},
      ${description},
      ${url},
      ${UserId},
      ${longUrl}
    )
    RETURNING 
      "_id",
      "name",
      "description",
      "url",
      "longUrl",
      "UserId",
      "createdAt",
      "updatedAt"
    `;

  console.log(query.text);
  console.log(query.values);
  const data: Recipes = await queryOne(query.text, query.values);

  return { data };
};

export default create;
