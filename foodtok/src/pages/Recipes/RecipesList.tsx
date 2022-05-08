import { Suspense, lazy, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import ctl from '@netlify/classnames-template-literals';
import { recipe } from '@foodtok-types/recipe';
import { getRecipes } from '@apis/recipes';
import CardLoading from '@components/CardLoading';
import ErrorIllustration from '@components/ErrorIllustration';
import OnError from '@components/onError';
import LoadingBar from '@components/LoadingBar';
const RecipeCard = lazy(() => import('./RecipeCard'));

const ButtonLink = () => (
  <Link
    className={ctl(`w-full max-w-lg mx-auto my-4 no-underline
    text-center
    relative
    inline-block
    prose dark:prose-invert
    py-2 px-3 rounded-lg
    font-bold text-lg

    outline-none

    border border-slate-800 dark:border-slate-200 
    translate-all duration-150 ease-in
    ring-cyan-500
    hover:ring-2 focus:ring-2 active:ring-2
    
    `)}
    to="create"
  >
    Add new Recipe!ssss
  </Link>
);

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Array<recipe>>([]);
  const { isError, isLoading, data, error } = getRecipes();

  console.log(data);
  useEffect(() => {
    if (!isLoading && !isError && data) setRecipes(data.data);
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
        <>
          {recipes.map((item, index) => (
            <Suspense
              fallback={<CardLoading rows={3} rKey="Fallback_Recipe_List" />}
              key={`${item._id}_${index}`}
            >
              <RecipeCard recipe={item} />
            </Suspense>
          ))}
          <div className="relative w-full h-20">
            <LoadingBar />
            <div className="absolute inset-0 top-1/2 -translate-y-1/2 px-2 flex justify-center items-center">
              <p className="text-xl font-semibold tracking-widest bg-clip-text fill-transparent">
                Loading More
              </p>
            </div>
          </div>
        </>
      ) : (
        <ErrorIllustration errorMsg="oops! no recipes to display" />
      )}
    </>
  );
};

export default RecipesList;
