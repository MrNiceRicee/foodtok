import verify from '@mrnicericee/verify';
import SQL, { SQLStatement } from 'sql-template-strings';
import ErrorException from './ErrorException';

const encode64 = (string: string) => Buffer.from(string).toString('base64');
const decode64 = (encoded: string) =>
  Buffer.from(encoded, 'base64').toString('ascii');

const getLimit = (limit: any) => {
  const limitCheck = verify(limit, { soft: true, name: 'limit' }).isNumber();
  if (limitCheck.failed) return 25;

  limitCheck.isGT(0).isLTE(100);

  if (limitCheck.failed) throw new ErrorException(`${limitCheck.error}`, 400);
  return limitCheck.verifiedNumber.toNumber();
};

const determineOps = (key: string, value: any) => {
  const query = SQL``;
  if (Object.prototype.hasOwnProperty.call(value, 'EQ')) {
    query
      .append(` ${value.OR ? 'OR' : 'AND'} a."${key}" = `)
      .append(SQL`${value.EQ} `);
  }
  if (Object.prototype.hasOwnProperty.call(value, 'GT')) {
    query
      .append(` ${value.OR ? 'OR' : 'AND'} a."${key}" > `)
      .append(SQL`${value.GT} `);
  }
  if (Object.prototype.hasOwnProperty.call(value, 'GTE')) {
    query
      .append(` ${value.OR ? 'OR' : 'AND'} a."${key}" >= `)
      .append(SQL`${value.GTE} `);
  }
  if (Object.prototype.hasOwnProperty.call(value, 'LT')) {
    query
      .append(` ${value.OR ? 'OR' : 'AND'} a."${key}" < `)
      .append(SQL`${value.LT} `);
  }
  if (Object.prototype.hasOwnProperty.call(value, 'LTE')) {
    query
      .append(` ${value.OR ? 'OR' : 'AND'} a."${key}" <= `)
      .append(SQL`${value.LTE} `);
  }
  if (Object.prototype.hasOwnProperty.call(value, 'ILIKE')) {
    query
      .append(` ${value.OR ? 'OR' : 'AND'} a."${key}" ILIKE `)
      .append(SQL`${`%${value.ILIKE}%`}`);
  }
  if (Object.prototype.hasOwnProperty.call(value, 'LIKE')) {
    query
      .append(` ${value.OR ? 'OR' : 'AND'} a."${key}" LIKE `)
      .append(SQL`${`%${value.LIKE}%`}`);
  }
  return query;
};

const getFilter = (filter: any, fields: Array<string>) => {
  const query = SQL` WHERE 1=1 `;
  if (!filter) return query;
  try {
    filter = JSON.parse(filter);
  } catch (err) {
    throw new ErrorException('invalid filter', 400);
  }
  for (const key in filter) {
    const element = filter[key];
    if (fields.includes(key)) {
      if (+element) {
        query.append(` AND a."${key}" = `).append(SQL`${element}`);
        continue;
      }
      if (typeof element === 'string' || element instanceof String) {
        query.append(` AND a."${key}" ILIKE `).append(SQL`${`%${element}%`}`);
        continue;
      }
      query.append(determineOps(key, element));
    }
  }
  return query;
};

const validDirections = ['ASC', 'DESC'];

const getOrder = (
  order: string,
  orderFields: Array<string>
): [string, string, SQLStatement] => {
  const query = SQL` ORDER BY `;
  let [field, direction] = order.split(':');
  if (!orderFields.includes(field))
    throw new ErrorException('invalid order', 400);
  if (!direction) direction = 'DESC';
  if (!validDirections.includes(direction))
    throw new ErrorException('invalid direction', 400);

  query.append(` a."${field}" `).append(`${direction}`);
  return [field, direction, query];
};

const buildCursor = (row: any, field: string) => {
  return encode64(JSON.stringify([row[field], row._id]));
};

const getCursor = ({
  field,
  direction,
  cursor,
}: {
  field: string;
  direction: string;
  cursor?: string;
}) => {
  if (!cursor) return;
  let order;
  let id;
  try {
    [order, id] = JSON.parse(decode64(cursor));
  } catch (err) {
    throw new ErrorException('failed to parse cursor', 400);
  }

  return SQL` AND (`
    .append(`a."${field}", a."_id") ${direction === 'DESC' ? '<' : '>'}`)
    .append(SQL`(${order}, ${id})`);
};

const buildSearchRes = ({
  data,
  limit,
  field,
}: {
  data: Array<any>;
  limit: number;
  field: string;
}) => {
  if (!data.length)
    return {
      data: [],
      length: 0,
      hasNextPage: false,
      cursor: null,
      page: 0,
    };

  const hasNextPage = data.length > limit;
  if (hasNextPage) data.pop();
  const cursor = buildCursor(data[data.length - 1], field);
  return {
    data,
    length: data.length,
    hasNextPage,
    cursor,
  };
};

const base64 = {
  encode64,
  decode64,
};

export { getLimit, getFilter, getOrder, base64, getCursor, buildSearchRes };
