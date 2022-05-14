import Table from '@components/Table';
import { Column } from '@components/Table/types';
import { Ingredients } from '@foodtok-types/recipe';

const columns: Column = [
  {
    header: 'name',
    accessor: 'name',
  },
];

const RecipeDetailIngredients = ({
  Ingredients,
}: {
  Ingredients?: Array<Ingredients>;
}) => {
  return (
    <article className="px-2 py-4 dark:text-slate-100">
      <h2 className="text-xl font-black">Ingredients</h2>
      <Table column={columns} data={Ingredients} />
    </article>
  );
};

export default RecipeDetailIngredients;
