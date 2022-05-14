import { lazy, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import ctl from '@netlify/classnames-template-literals';
import { useInView } from 'react-intersection-observer';
import { userRecipe } from '@apis/recipes';
import ErrorIllustration from '@components/ErrorIllustration';
import OnError from '@components/onError';
import LoadingBar from '@components/LoadingBar';
import { useInfiniteQuery } from 'react-query';
import * as React from 'react';
import useUser from '@hooks/useUser';
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
    Add new Recipe!
  </Link>
);

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) return <LoadingBar />;
  return <ErrorIllustration errorMsg="oops! no recipes to display" />;
};

const RecipesList = () => {
  const { ref, inView } = useInView();
  const user = useUser();
  const {
    isError,
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['RecipeList', `${user?.id}`],
    async ({ pageParam }) => {
      return userRecipe({
        limit: 25,
        cursor: pageParam,
      }).then((item) => item.data);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.cursor : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      (async () => {
        await fetchNextPage();
      })();
    }
  }, [inView]);

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
      {data?.pages && data.pages[0].length ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {data.pages.map((page, index) => (
            <React.Fragment key={`${page.cursor}_${index}`}>
              {page.data.map((item) => (
                <React.Suspense key={`${item._id}`} fallback={<LoadingBar />}>
                  <RecipeCard recipe={item} />
                </React.Suspense>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <Loading isLoading={isLoading} />
      )}
      <button
        className="relative w-full h-20"
        ref={ref}
        type="button"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {hasNextPage && (
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 px-2 flex justify-center items-center">
            <p className="text-xl font-semibold tracking-widest text-pink-500">
              more
            </p>
          </div>
        )}
      </button>
    </>
  );
};

export default RecipesList;
