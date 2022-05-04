import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { Users } from '@foodtok-types/Users';

interface createPayload {
  name: string;
  url?: string;
}

const create = async (id: string, { name, url }: createPayload) => {
  verify(name, { name: 'name' }).isString().isLength(6, { operator: 'gte' });

  const query = SQL`
    INSERT INTO "Users"("_id", "name", "url")
    VALUES(${id}, ${name}, ${url})
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
