interface Users {
  id: number;
  name: string;
  url: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UpdatedUser {
  data: Users;
  updated: Array<string>;
}

export type { Users, UpdatedUser };
