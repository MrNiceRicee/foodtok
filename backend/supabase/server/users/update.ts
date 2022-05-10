import SQL from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';
import { Users } from '@foodtok-types/Users';

interface updatePayload {
  name: string;
  url: string;
  displayName: string;
}

type ReturnUser = Omit<Users, '_id'>;

const findUser = async (
  id: string
): Promise<{ name: string; url: string; displayName: string }> =>
  queryOne(
    `
    SELECT "name", "url", "displayName"
    FROM "Users"
    WHERE "_id"=$1
  `,
    [id]
  );

const update = async (id: string, updatePayload: updatePayload) => {
  verify(id, { name: 'id' });
  const { name, url, displayName } = updatePayload;
  if (!name && !url && !displayName)
    throw new ErrorException('missing upload payload', 400);

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
  if (displayName) {
    verify(displayName, { name: 'display name' })
      .isString()
      .isLength(2, { operator: 'gte' })
      .isLength(26, { operator: 'lte' });
    if (displayName.includes(' '))
      throw new ErrorException('cannot have spaces!', 400);
    updated.push('displayName');
    query.append(SQL`"displayName"=${displayName},`);
  }
  query.append(SQL`
    "updatedAt"=NOW()
    WHERE "_id"=${id}
    RETURNING
      "name",
      "url",
      "displayName",
      "createdAt",
      "updatedAt"
    `);

  const data: ReturnUser = await queryOne(query.text, query.values);
  return { data, updated };
};

export default update;
