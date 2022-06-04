import {
  getLimit,
  getOrder,
  getCursor,
  buildSearchRes,
  getFilter,
} from '@util/utility';
import SQL, { SQLStatement } from 'sql-template-strings';
import { queryRows } from '../../connection/db';
import { JoinedRecipe } from '../../types/Recipes';

interface Payload {
  UserId?: string;
  order?: any;
  limit?: any;
  cursor?: string;
  filter?: string | SQLStatement;
}

const validOrder = ['_id', 'name', 'createdAt', 'updatedAt'];
const validFilter = ['_id', 'name', 'description', 'UserId'];
const defaultOrder = '_id:ASC';

const userRecipe = async (payload: Payload) => {
  let { filter, UserId, limit, cursor, order = defaultOrder } = payload;
  limit = getLimit(limit);
  console.log(filter);
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
    WHERE "UserId"=${UserId}
    `;
  query.append(filter).append(SQL` AND "UserId"=${UserId}`);

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

export default userRecipe;
