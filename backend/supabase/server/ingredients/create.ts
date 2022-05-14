import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { Ingredients } from '../../types/Ingredients';

interface createPayload {
  name: string;
}

const create = async ({ name }: createPayload) => {
  verify(name, { name: 'name' });

  const query = SQL`
    INSERT INTO "Ingredients"("name")
    VALUES(${name})
    RETURNING
      "_id",
      "name",
      "createdAt"
  `;
  const data: Ingredients = await queryOne(query.text, query.values);
  return { data };
};

export default create;
