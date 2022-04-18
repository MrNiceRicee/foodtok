import { Suspense, lazy } from 'react';
import { useQuery } from 'react-query';

import { search as searchEndpoint } from '../../api/recipes';
import CardLoading from '../../components/CardLoading';
import ErrorComp from '../../components/ErrorComp';

const RecipeCard = lazy(() => import('./RecipeCard'));

const getRecipes = async () => {
  const { data } = await searchEndpoint();
  if (data) {
    return data.data;
  }
  return [];
};

const RecipesList = () => {
  const { isLoading, data } = useQuery(`RecipeList`, () =>
    getRecipes().then((item) => item)
  );

  if (isLoading) return <CardLoading rows={3} rKey="Loading_Recipe_List" />;

  return (
    <>
      {data ? (
        data.map((item, index) => (
          <Suspense
            fallback={<CardLoading rows={3} rKey="Fallback_Recipe_List" />}
            key={`${item._id}_${index}`}
          >
            <RecipeCard recipe={item} />
          </Suspense>
        ))
      ) : (
        <ErrorComp errorMsg="Something went wrong! Try refreshing" />
      )}
    </>
  );
};

export default RecipesList;
