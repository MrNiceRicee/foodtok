const RecipeDetailIngredients = ({
  Ingredients,
}: {
  Ingredients: Array<any>;
}) => {
  return (
    <article className="px-2 py-4 dark:text-slate-100">
      <h2 className="text-xl font-black">Ingredients</h2>
    </article>
  );
};

export default RecipeDetailIngredients;
