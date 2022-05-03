import SQL from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';
import { Users } from '@foodtok-types/Users';

interface updatePayload {
  name: string;
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

const update = async (id: number, updatePayload: updatePayload) => {
  verify(id, { name: 'id' }).isNumber();
  const { name, url } = updatePayload;
  if (!name && !url) throw new ErrorException('missing upload payload', 400);

  const foundUser = await findUser(id);
  if (!foundUser) throw new ErrorException('user not found', 404);

  const updated = [];
  const query = SQL`
    UPDATE "Users"
    SET
  `;
  if (name) {
    updated.push('name');
    query.append(SQL`"name"=${name},`);
  }
  if (url) {
    updated.push('url');
    query.append(SQL`"url"=${url},`);
  }
  query.append(SQL`
    "updatedAt"=NOW()
    WHERE "_id"=${id}
    RETURNING
      "_id",
      "name",
      "url",
      "createdAt",
      "updatedAt"
    `);

  const data: Users = await queryOne(query.text, query.values);
  return { data, updated };
};

export default update;
