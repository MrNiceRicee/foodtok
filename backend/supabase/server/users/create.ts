import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { Users } from '@foodtok-types/Users';

interface createPayload {
  name: string;
  url?: string;
}

const create = async ({ name, url }: createPayload) => {
  verify(name, { name: 'name' });

  const query = SQL`
    INSERT INTO "Users"("name", "url")
    VALUES(${name}, ${url})
    RETURNING
      "_id",
      "name",
      "url",
      "createdAt",
      "updatedAt"
  `;
  const data: Users = await queryOne(query.text, query.values);
  return { data };
};

export default create;
