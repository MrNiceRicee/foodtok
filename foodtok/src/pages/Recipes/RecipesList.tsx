import React, { useEffect, useState } from 'react';
import { search as searchEndpoint } from '../../api/recipes';

import { searchData } from '../../types/search';
// import RecipeCard from './RecipeCard';
const RecipeCard = React.lazy(() => import('./RecipeCard'));

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Array<searchData>>([]);

  useEffect(() => {
    async function getRecipes() {
      const { ok, data } = await searchEndpoint();
      if (!ok) {
        console.log('oops', data);
        return;
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
        <React.Suspense fallback={<>...</>} key={`${item._id}_${index}`}>
          <RecipeCard recipe={item} />
        </React.Suspense>
      ))}
    </>
  );
};

export default RecipesList;
