interface Ingredients {
  _id: number;
  name: string;
  description: string;
  servingSize: number;
  servingUnit: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { Ingredients };
