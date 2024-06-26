interface Recipes {
  _id: number;
  name: string;
  description: string;
  url: string;
  longUrl: string;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface JoinedRecipe extends Recipes {
  User: {
    name: string;
    url: string;
  };
  Ingredients: {
    IngredientId: number;
    name: string;
    description: string;
    customDescription: string;
  };
}

export type { Recipes, JoinedRecipe };
