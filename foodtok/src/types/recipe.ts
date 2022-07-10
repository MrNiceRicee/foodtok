interface justRecipe {
  _id: string;
  name: string;
  description: string | null;
  url: string | null;
  longUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Ingredients {
  IngredientId: number;
  servingSize: number | null;
  servingUnit: string | null;
  description: string | null;
  name: string;
}

interface recipeBase extends justRecipe {
  User: {
    name: string;
    url: string | null;
    displayName: string | null;
    id: string;
  };
  Ingredients: Array<Ingredients>;
}

interface searchBase {
  cursor: string;
  data: Array<recipeBase>;
  hasNextPage: boolean;
  length: number;
}

type recipe = recipeBase;
type search = searchBase;
export type { recipe, search, justRecipe, Ingredients };

// <333333333333333
