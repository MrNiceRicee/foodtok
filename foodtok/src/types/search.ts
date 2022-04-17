interface data {
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
  data: Array<data>;
  hasNextPage: boolean;
  length: number;
}

export type recipe = data;
export type searchData = data;
export type search = searchBase;

// <33333333333333
