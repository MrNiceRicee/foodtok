import { useState } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ingredients as IngredientsType } from '@foodtok-types/recipe';
import AddNewIngredient from './AddNewIngredient';
import RecipeIngredientsTable from './RecipeIngredientsTable';

const RecipeDetailIngredients = ({
  Ingredients,
  RecipeId,
  UserId,
}: {
  Ingredients?: Array<IngredientsType>;
  RecipeId: string;
  UserId: string;
}) => {
  const [open, setOpen] = useState(false);

  const onClick = () => setOpen((old) => !old);

  return (
    <article className="px-2 py-4 dark:text-slate-100">
      <div>
        <h2 className="text-xl font-black inline-block">Ingredients</h2>
        <button className="inline-block px-2" onClick={onClick}>
          <FontAwesomeIcon icon={faPlusCircle} size="lg" />
        </button>
      </div>
      {open && (
        <div>
          <AddNewIngredient RecipeId={RecipeId} UserId={UserId} />
        </div>
      )}
      {/* <Table column={columns} data={Ingredients} />
      <div>Neat!</div> */}
      <RecipeIngredientsTable
        data={Ingredients || []}
        RecipeId={RecipeId}
        UserId={UserId}
      />
    </article>
  );
};

export default RecipeDetailIngredients;
