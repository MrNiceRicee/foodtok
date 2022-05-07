import SQL from 'sql-template-strings';
import { queryOne } from '../../connection/db';
import { JoinedRecipe } from '../../types/Recipes';

const one = async (id: number) => {
  const query = SQL`
    SELECT
    a."_id",
    a."name",
    a."description",
    a."url",
    a."longUrl",
    json_build_object(
        'name', "User"."name",
        'url', "User"."url"
    ) as "User",
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
    LEFT JOIN "Users" "User" ON "UserId"="User"."_id"
    WHERE a."_id"=${id}
    `;

  const data: JoinedRecipe = await queryOne(query.text, query.values);

  return {
    data,
  };
};

export default one;
