import SQL, { SQLStatement } from 'sql-template-strings';
import { queryRows } from '../../connection/db';
import Recipes from '../../types/Recipes';
import {
  buildSearchRes,
  getCursor,
  getFilter,
  getLimit,
  getOrder,
} from '../util/utility';

interface searchPayload {
  filter?: string | SQLStatement;
  order?: any;
  limit?: any;
  cursor?: string;
}

const validFilter = ['_id', 'name', 'description', 'CreatorId'];
const validOrder = ['_id', 'name', 'CreatorId'];
const defaultOrder = '_id:ASC';

const search = async (searchPayload: searchPayload) => {
  let { filter, limit, cursor, order = defaultOrder } = searchPayload;
  limit = getLimit(limit);
  filter = getFilter(filter, validFilter);
  const [field, direction, orderQuery] = getOrder(order, validOrder);
  const cursorQuery = getCursor({
    cursor,
    direction,
    field,
  });

  const query = SQL`
    SELECT
      a."_id",
      a."name",
      a."description",
      a."url",
      a."CreatorId",
      json_build_object(
        'name', "Creator"."name",
        'url', "Creator"."url"
      ) as "Creator",
      (SELECT json_agg(x) FROM
        (
          SELECT 
            i._id as "IngredientId",
            i.name,
            i.description,
            ri.description as "customDescription"
          FROM "Ingredients" i
          LEFT OUTER JOIN "Recipes_Ingredients" as ri ON i._id=ri."IngredientId"
          WHERE a._id=ri."RecipeId"
        ) as x
      ) as "Ingredients",
      a."createdAt",
      a."updatedAt"

    FROM "Recipes" a
    LEFT JOIN "Creators" "Creator" ON "CreatorId"="Creator"."_id"
      `;
  query.append(filter);
  if (cursorQuery) query.append(cursorQuery);
  if (orderQuery) query.append(orderQuery);

  query.append(SQL` LIMIT ${limit + 1}`);

  const data: Array<Recipes> = await queryRows(query.text, query.values);

  return buildSearchRes({
    data,
    limit,
    field,
  });
};

export default search;
