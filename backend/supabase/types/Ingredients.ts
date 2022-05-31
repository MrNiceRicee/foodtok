interface Ingredient {
  _id: number;
  name: string;
  createdAt: Date;
}

interface Ingredients extends Ingredient {
  _id: number;
  name: string;
  servingSize: number;
  servingUnit: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { Ingredient, Ingredients };
