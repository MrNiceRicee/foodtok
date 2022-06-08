import verify from '@mrnicericee/verify';
import supabase from '@util/supabase';
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
  const { value: verifyName } = verify(name, { name: 'name' });
  if (!verifyName) throw new ErrorException('name not defined', 400);
  const { value: verifyUser } = verify(UserId, { name: 'UserId' });
  if (!verifyUser) throw new ErrorException('UserId not defined', 400);

  const foundUser = await findUser(UserId);
  if (!foundUser) throw new ErrorException('User not found', 404);

  const acceptedName = name.trim();
  let longUrl = '';
  if (url) {
    if (
      !url.includes('vm.tiktok.com') &&
      !url.includes('www.tiktok.com') &&
      !url.includes('tiktok')
    )
      throw new ErrorException('url must be from Tiktok', 400);
    let scrubbedURL = url.replace(/\?(?:www\.|[\-;:&=\+\$,\w]+)/, '');
    if (!url.match(/([tiktok]\w+)([.com]\w+)\/@(?:[a-zA-z]*)\/video\//)) {
      scrubbedURL = url.replace(/(?:\/\/)(?:www.)/, '//vm.');
    }
    longUrl = await getUrl(scrubbedURL);
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
      ${acceptedName},
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

  const data: Recipes = await queryOne(query.text, query.values);

  return { data };
};

export default create;
