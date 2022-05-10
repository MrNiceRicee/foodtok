import { Users } from '@foodtok-types/Users';
import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { base64 } from '@util/utility';

const one = async ({ id }: { id: string }) => {
  verify(id, { name: 'id' }).isString();
  const decodeId = base64.decode64(id);
  const query = SQL`
    SELECT
      "name",
      "displayName",
      "url",
      "createdAt",
      "updatedAt"
    FROM "Users"
    WHERE "_id"=${decodeId}
  `;
  const data: Users = await queryOne(query.text, query.values);
  return { data };
};

export default one;
