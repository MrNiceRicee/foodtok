interface recipeBase extends justRecipe {
  User: {
    name: string;
    url: string | null;
  };
  Ingredients: Array<{
    IngredientId: number;
    customDescription: string | undefined;
    description: string | undefined;
    name: string;
  }>;
}

interface justRecipe {
  _id: string;
  name: string;
  description: string | null;
  url: string | null;
  longUrl: string | null;
  UserId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface searchBase {
  cursor: string;
  data: Array<recipeBase>;
  hasNextPage: boolean;
  length: number;
}

type recipe = recipeBase;
type search = searchBase;
export type { recipe, search, justRecipe };

// <33333333333333
