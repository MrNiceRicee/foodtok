import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { Ingredients } from '../../types/Ingredients';

interface createPayload {
  name: string;
  UserId: string;
}

const create = async ({ name, UserId }: createPayload) => {
  verify(name, { name: 'name' });
  verify(UserId, { name: 'UserId' });

  const query = SQL`
    INSERT INTO "Ingredients"("name", "UserId")
    VALUES(${name}, ${UserId})
    RETURNING
      "_id",
      "name",
      "UserId",
      "createdAt"
  `;

  const data: Ingredients = await queryOne(query.text, query.values);
  return { data };
};

export default create;
