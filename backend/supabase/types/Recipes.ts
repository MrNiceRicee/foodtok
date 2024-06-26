interface Recipes {
  _id: number;
  name: string;
  description: string;
  url: string;
  longUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface JoinedRecipe extends Recipes {
  User: {
    id: string;
    name: string;
    displayName: string;
    url: string;
  };
  Ingredients: {
    IngredientId: number;
    name: string;
    description: string;
    servingSize: number;
    servingUnit: string;
    customDescription: string;
  };
}

export type { Recipes, JoinedRecipe };
