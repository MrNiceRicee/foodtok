import { useEffect, useState } from 'react';
import { search as searchEndpoint } from '../../api/recipes';

import { searchData } from '../../types/search';
import RecipeCard from './RecipeCard';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Array<searchData>>([]);

  useEffect(() => {
    async function getRecipes() {
      const { ok, data } = await searchEndpoint();
      if (!ok) {
        console.log('oops', data);
      }
      if (data ?? data) {
        setRecipes(data.data);
      }
    }
    getRecipes();
  }, []);
  return (
    <>
      {recipes.map((item, index) => (
        <RecipeCard key={`${item._id}_${index}`} recipe={item} />
      ))}
    </>
  );
};

export default RecipesList;
