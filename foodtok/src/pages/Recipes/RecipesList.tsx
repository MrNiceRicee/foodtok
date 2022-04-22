import { Suspense, lazy, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Button from '@components/Button';
import { Link } from 'react-router-dom';
import { search as searchEndpoint } from '@apis/recipes';
import CardLoading from '@components/CardLoading';
import ErrorIllustration from '@components/ErrorIllustration';
import { recipe } from '@foodtok-types/recipe';
const RecipeCard = lazy(() => import('./RecipeCard'));

const getRecipes = async () => {
  const { data } = await searchEndpoint();
  if (data) {
    return data.data;
  }
  return [];
};

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Array<recipe>>([]);
  const { isError, isLoading, data } = useQuery('RecipeList', () =>
    getRecipes().then((item) => item)
  );

  useEffect(() => {
    if (data) setRecipes(data);
  }, [data]);

  if (isLoading) return <CardLoading rows={3} rKey="Loading_Recipe_List" />;

  if (isError)
    return <ErrorIllustration errorMsg="oops! failed to load recipes" />;

  return (
    <>
      <Link
        className="w-full flex justify-center max-w-lg mx-auto my-4 no-underline"
        to="create"
      >
        <Button className="bg-emerald-400 w-full" variance="filled">
          Add new Recipe!
        </Button>
      </Link>
      {recipes && recipes.length ? (
        recipes.map((item, index) => (
          <Suspense
            fallback={<CardLoading rows={3} rKey="Fallback_Recipe_List" />}
            key={`${item._id}_${index}`}
          >
            <RecipeCard recipe={item} />
          </Suspense>
        ))
      ) : (
        <ErrorIllustration errorMsg="oops! no recipes to display" />
      )}
    </>
  );
};

export default RecipesList;
