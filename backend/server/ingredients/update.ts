import SQL from 'sql-template-strings';
import verify from '@mrnicericee/verify';
import { queryOne } from '../../connection/db';
import ErrorException from '../util/ErrorException';
import Creators from '../../types/Creators';

interface updatePayload {
  name: string;
  description: string;
}

const findIngredient = async (id: number): Promise<{ name: string; description: string }> =>
  queryOne(
    `
    SELECT "name", "description"
    FROM "Ingredients"
    WHERE "_id"=$1
  `,
    [id]
  );

const update = async (id: number, updatePayload: updatePayload) => {
  verify(id, { name: 'id' }).isNumber();
  const { name, description } = updatePayload;
  if (!name && !description) throw new ErrorException('missing upload payload', 400);

  const foundCreator = await findIngredient(id);
  if (!foundCreator) throw new ErrorException('ingredient not found', 404);

  const updated = [];
  const query = SQL`
    UPDATE "Ingredients"
    SET
  `;
  if (name) {
    updated.push('name');
    query.append(SQL`"name"=${name},`);
  }
  if (description) {
    updated.push('description');
    query.append(SQL`"description"=${description},`);
  }
  query.append(SQL`
    "updatedAt"=NOW()
    WHERE "_id"=${id}
    RETURNING
      "_id",
      "name",
      "description",
      "createdAt",
      "updatedAt"
    `);

  const data: Creators = await queryOne(query.text, query.values);
  return { data, updated };
};

export default update;
