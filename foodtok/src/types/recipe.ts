interface recipeBase {
  _id: string;
  name: string;
  description: string | null;
  url: string | null;
  UserId: number;
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
  createdAt: Date;
  updatedAt: Date;
}

interface searchBase {
  cursor: string;
  data: Array<recipeBase>;
  hasNextPage: boolean;
  length: number;
}

export type recipe = recipeBase
export type search = searchBase;

// <33333333333333
