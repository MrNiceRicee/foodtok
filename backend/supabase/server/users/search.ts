import SQL, { SQLStatement } from 'sql-template-strings';
import { queryRows } from '@connection/db';
import { Users } from '@foodtok-types/Users';
import { getFilter, getLimit } from '@util/utility';

interface searchPayload {
  filter?: string | SQLStatement;
  order?: any;
  limit?: any;
}

const validFilter = ['name', 'displayName'];

const search = async (searchPayload: searchPayload) => {
  let { filter, limit } = searchPayload;
  limit = getLimit(limit);
  filter = getFilter(filter, validFilter);

  const query = SQL`
    SELECT
      a."name" as "email",
      a."displayName",
      a."url"
    FROM "Users" a
      `
    .append(filter)
    .append(SQL` LIMIT ${limit}`);

  const data: Array<Users> = await queryRows(query.text, query.values);


  return {
    data,
    length: data.length,
  };
};

export default search;
