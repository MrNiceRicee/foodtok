import SQL, { SQLStatement } from 'sql-template-strings';
import { queryRows } from '../../connection/db';
import { Ingredients } from '../../types/Ingredients';
import { getFilter, getLimit } from '../util/utility';

interface searchPayload {
  filter?: string | SQLStatement;
  order?: any;
  limit?: any;
}

const validFilter = ['name', 'description'];

const search = async (searchPayload: searchPayload) => {
  let { filter, limit } = searchPayload;
  limit = getLimit(limit);
  filter = getFilter(filter, validFilter);

  const query = SQL`
    SELECT
      a."_id",
      a."name",
      a."description",
      a."createdAt",
      a."updatedAt"
    FROM "Ingredients" a
      `
    .append(filter)
    .append(SQL` LIMIT ${limit}`);

  const data: Array<Ingredients> = await queryRows(query.text, query.values);

  return {
    data,
    length: data.length,
  };
};

export default search;
