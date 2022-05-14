import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@components/Table';
import { Column } from '@components/Table/types';
import { Ingredients } from '@foodtok-types/recipe';

const columns: Column = [
  {
    header: 'name',
    accessor: 'name',
  },
  {
    header: 'serving',
    accessor: 'servingSize',
  },
  {
    header: 'unit',
    accessor: 'servingUnit',
  },
];

const RecipeDetailIngredients = ({
  Ingredients,
}: {
  Ingredients?: Array<Ingredients>;
}) => {
  return (
    <article className="px-2 py-4 dark:text-slate-100">
      <div>
        <h2 className="text-xl font-black inline-block">Ingredients</h2>
        <button className="inline-block px-2">
          <FontAwesomeIcon icon={faPlusCircle} size="lg" />
        </button>
      </div>
      <Table column={columns} data={Ingredients} />
    </article>
  );
};

export default RecipeDetailIngredients;
