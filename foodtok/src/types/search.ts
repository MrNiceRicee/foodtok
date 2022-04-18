interface recipeBase {
  _id: string;
  name: string;
  description: string | null;
  url: string | null;
  CreatorId: number;
  Creator: {
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
