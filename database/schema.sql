CREATE TABLE "Users"(
  _id UUID REFERENCES auth.users NOT NULL,
  "name" VARCHAR(240) NOT NULL,
  "displayName" VARCHAR(240),
  "url" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (_id)
);
CREATE TABLE "Recipes"(
  _id INT GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(240) NOT NULL,
  "description" VARCHAR(240),
  "url" TEXT,
  "longUrl" TEXT,
  "UserId" UUID,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "Recipes_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "Users"(_id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (_id)
);
CREATE TABLE "Categories"(
  _id INT GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(240) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (_id)
);
CREATE TABLE "Ingredients"(
  _id INT GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(240) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("name"),
  PRIMARY KEY (_id)
);
-- relationship tables
CREATE TABLE "Recipes_Categories"(
  _id INT GENERATED ALWAYS AS IDENTITY,
  "RecipeId" INT,
  "CategoryId" INT,
  "UserId" UUID,
  "name" varchar(240),
  "description" varchar(240),
  CONSTRAINT "Recipes_Categories_RecipeId_fk" FOREIGN KEY ("RecipeId") REFERENCES "Recipes"(_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Recipes_Categories_CategoryId_fk" FOREIGN KEY ("CategoryId") REFERENCES "Categories"(_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Categories_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "Users"(_id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY ("_id", "RecipeId", "CategoryId")
);
CREATE TABLE "Recipes_Ingredients"(
  _id INT GENERATED ALWAYS AS IDENTITY,
  "RecipeId" INT,
  "IngredientId" INT,
  "UserId" UUID,
  "description" VARCHAR(240),
  "servingSize" DECIMAL,
  "servingUnit" VARCHAR(240),
  CONSTRAINT "Recipes_Ingredients_RecipeId_fk" FOREIGN KEY ("RecipeId") REFERENCES "Recipes"(_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Categories_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "Users"(_id) ON UPDATE CASCADE ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("_id", "RecipeId", "IngredientId")
);