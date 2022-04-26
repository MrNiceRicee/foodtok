import { Suspense, lazy, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { search as searchEndpoint } from '@apis/recipes';
import CardLoading from '@components/CardLoading';
import ErrorIllustration from '@components/ErrorIllustration';
import { recipe } from '@foodtok-types/recipe';
import ctl from '@netlify/classnames-template-literals';
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
    font-bold text-lg
    bg-emerald-400

    before:absolute before:inset-0 before:w-full before:h-full before:bg-inherit before:rounded-[inherit] before:opacity-25 
    hover:before:opacity-25 hover:before:h-[calc(100%+0.75rem)] hover:before:w-[calc(100%+0.75rem)] hover:before:-left-1.5 hover:before:-top-1.5
    after:before:opacity-25 after:before:h-[calc(100%+0.75rem)] after:before:w-[calc(100%+0.75rem)] after:before:-left-1.5 after:before:-top-1.5
    focus:before:opacity-25 focus:before:h-[calc(100%+0.75rem)] focus:before:w-[calc(100%+0.75rem)] focus:before:-left-1.5 focus:before:-top-1.5 
    before:z-[-1] 

    focus:before:animate-growing

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
  const { isError, isLoading, data } = useQuery('RecipeList', () =>
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
      <>
        <ButtonLink />
        <ErrorIllustration errorMsg="oops! failed to load recipes" />
      </>
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
