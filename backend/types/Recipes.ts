interface Recipes {
  _id: number;
  name: string;
  description: string;
  url: string;
  CreatorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default Recipes;
