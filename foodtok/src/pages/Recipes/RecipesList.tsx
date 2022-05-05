import { Suspense, lazy, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { search as searchEndpoint } from '@apis/recipes';
import CardLoading from '@components/CardLoading';
import ErrorIllustration from '@components/ErrorIllustration';
import { recipe } from '@foodtok-types/recipe';
import ctl from '@netlify/classnames-template-literals';
import OnError from '@components/onError';
import { AxiosError } from 'axios';
const RecipeCard = lazy(() => import('./RecipeCard'));

const ButtonLink = () => (
  <Link
    className={ctl(`w-full max-w-lg mx-auto my-4 no-underline
    justify-center
    content-center
    relative
    flex
    prose dark:prose-invert
    py-2 px-3 rounded-lg
    bg-emerald-500 
    font-bold text-lg
    group

    outline-none
    dark:hover:outline-slate-50/30 hover:outline-slate-900/30 hover:outline hover:outline-8 hover:outline-offset-0
    dark:focus:outline-slate-50/30 focus:outline-slate-900/30 focus:outline focus:outline-8 focus:outline-offset-0
    dark:active:outline-slate-50/30 active:outline-slate-900/30 active:outline active:outline-8 active:outline-offset-0

    shadow-md shadow-slate-600/50
    hover:shadow-sm focus:shadow-sm active:shadow-sm

    before:transition-all before:duration-150 before:ease-in
    translate-all duration-150 ease-in
    
    `)}
    to="create"
  >
    Add new Recipe!ssss
  </Link>
);

const getRecipes = async () => {
  const { data } = await searchEndpoint();
  if (data) {
    return data.data;
  }
  return [];
};

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Array<recipe>>([]);
  const { isError, isLoading, data, error } = useQuery('RecipeList', () =>
    getRecipes().then((item) => item)
  );

  useEffect(() => {
    if (!isLoading && !isError && data) setRecipes(data);
  }, [data]);

  if (isLoading) {
    return (
      <>
        <ButtonLink />
        <CardLoading rows={3} rKey="Loading_Recipe_List" />
      </>
    );
  }

  if (isError) {
    return (
      <OnError error={error as AxiosError}>
        <ButtonLink />
        <ErrorIllustration errorMsg="oops! failed to load recipes" />
      </OnError>
    );
  }

  return (
    <>
      <ButtonLink />
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
