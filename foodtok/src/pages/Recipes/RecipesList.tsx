import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { search as searchEndpoint } from '../../api/recipes';
import CardLoading from '../../components/CardLoading';
import LoadingBar from '../../components/LoadingBar';

import { searchData } from '../../types/search';
// import RecipeCard from './RecipeCard';
const RecipeCard = React.lazy(() => import('./RecipeCard'));

const getRecipes = async () => {
  const { ok, data } = await searchEndpoint();
  if (!ok) {
    console.log('oops', data);
    return;
  }
  if (data ?? data) {
    console.log(data.data);
    return data.data;
  }
  return [];
};

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Array<searchData>>([]);

  const { isError, isLoading, data } = useQuery(`RecipeList`, () =>
    getRecipes().then((item) => item)
  );

  useEffect(() => setRecipes(!!data ? data : []), [data]);

  if (isLoading) return <CardLoading rows={3} key="Loading_Recipe_List" />;

  return (
    <>
      {recipes.map((item, index) => (
        <React.Suspense
          fallback={<CardLoading rows={3} key="Fallback_Recipe_List" />}
          key={`${item._id}_${index}`}
        >
          <RecipeCard recipe={item} />
        </React.Suspense>
      ))}
    </>
  );
};

export default RecipesList;
