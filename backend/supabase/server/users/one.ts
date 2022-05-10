import { Users } from '@foodtok-types/Users';
import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';

const one = async ({ id }: { id: string }) => {
  verify(id, { name: 'id' }).isString();
  const query = SQL`
    SELECT
      "name",
      "displayName",
      "url",
      "createdAt",
      "updatedAt"
    FROM "Users"
    WHERE "_id"=${id}
  `;
  const data: Users = await queryOne(query.text, query.values);
  return { data };
};

export default one;
