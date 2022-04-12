import verify from '@mrnicericee/verify';
import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import Ingredients from '../../types/Ingredients';

interface createPayload {
  name: string;
  description?: string;
}

const create = async ({ name, description }: createPayload) => {
  verify(name, { name: 'name' });

  const query = SQL`
    INSERT INTO "Ingredients"("name", "description")
    VALUES(${name}, ${description})
    RETURNING
      "_id",
      "name",
      "description",
      "createdAt",
      "updatedAt"
  `;
  const data: Ingredients = await queryOne(query.text, query.values);
  return { data };
};

export default create;
