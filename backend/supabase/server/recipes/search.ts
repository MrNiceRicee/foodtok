import SQL, { SQLStatement } from 'sql-template-strings';
import { queryRows } from '../../connection/db';
import { JoinedRecipe } from '../../types/Recipes';
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

const validFilter = ['_id', 'name', 'description'];
const validOrder = ['_id', 'name', 'createdAt', 'updatedAt'];
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
      a."longUrl",
      json_build_object(
        'name', "User"."name",
        'url', "User"."url",
        'displayName', "User"."displayName",
        'id', "User"."_id"
      ) as "User",
      (SELECT json_agg(x) FROM
        (
          SELECT 
            i._id as "IngredientId",
            i.name,
            ri."servingSize",
            ri."servingUnit",
            ri.description as "customDescription"
          FROM "Ingredients" i
          LEFT OUTER JOIN "Recipes_Ingredients" as ri ON i._id=ri."IngredientId"
          WHERE a._id=ri."RecipeId"
          ORDER BY i."name"
        ) as x
      ) as "Ingredients",
      a."createdAt",
      a."updatedAt"

    FROM "Recipes" a
    LEFT JOIN "Users" "User" ON "UserId"="User"."_id"
    WHERE 1=1
      `;
  query.append(filter);
  if (cursorQuery) query.append(cursorQuery);
  if (orderQuery) query.append(orderQuery);

  query.append(SQL` LIMIT ${limit + 1}`);

  const data: Array<JoinedRecipe> = await queryRows(query.text, query.values);

  return buildSearchRes({
    data,
    limit,
    field,
  });
};

export default search;
