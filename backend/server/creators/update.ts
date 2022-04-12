import SQL from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';
import Creators from '../../types/Creators';

interface updatePayload {
  name: string;
  url: string;
}

const findCreator = async (id: number): Promise<{ name: string; url: string }> =>
  queryOne(
    `
    SELECT "name", "url"
    FROM "Creators"
    WHERE "_id"=$1
  `,
    [id]
  );

const update = async (id: number, updatePayload: updatePayload) => {
  verify(id, { name: 'id' }).isNumber();
  const { name, url } = updatePayload;
  if (!name && !url) throw new ErrorException('missing upload payload', 400);

  const foundCreator = await findCreator(id);
  if (!foundCreator) throw new ErrorException('creator not found', 404);

  const updated = [];
  const query = SQL`
    UPDATE "Creators"
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

  const data: Creators = await queryOne(query.text, query.values);
  return { data, updated };
};

export default update;
