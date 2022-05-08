import { lazy, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import ctl from '@netlify/classnames-template-literals';
import { useInView } from 'react-intersection-observer';
import { search } from '@apis/recipes';
import CardLoading from '@components/CardLoading';
import ErrorIllustration from '@components/ErrorIllustration';
import OnError from '@components/onError';
import LoadingBar from '@components/LoadingBar';
import { useInfiniteQuery } from 'react-query';
import * as React from 'react';
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
  const { ref, inView } = useInView();
  // const { isError, isLoading, data, error } = getRecipes();
  const {
    isError,
    isLoading,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['RecipeList'],
    async ({ pageParam }) => {
      console.log(pageParam);
      return search({
        limit: 2,
        cursor: pageParam,
        filter: null,
      }).then((item) => item.data);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.cursor : undefined;
      },
    }
  );

  useEffect(() => {
    console.log('hasNextPage', hasNextPage);
    if (inView && !isFetchingNextPage && hasNextPage) {
      (async () => {
        await fetchNextPage();
      })();
    }
  }, [inView]);

  if (isLoading || isFetchingNextPage) {
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

  // <Suspense
  //   fallback={<CardLoading rows={3} rKey="Fallback_Recipe_List" />}
  //   key={`${item._id}_${index}`}
  // >
  // </Suspense>
  return (
    <div className="h-fit">
      <ButtonLink />
      {data?.pages ? (
        <>
          {data.pages.map((page, index) => (
            <React.Fragment key={`${index}_${page.cursor}`}>
              {page.data.map((item, index) => (
                <React.Suspense
                  key={`${item._id}_${index}`}
                  fallback={
                    <CardLoading rKey="Fallback_Recipe_List" rows={3} />
                  }
                >
                  <RecipeCard recipe={item} />
                </React.Suspense>
              ))}
            </React.Fragment>
          ))}
          {}
          <div className="relative w-full h-20" ref={ref}>
            {hasNextPage && (
              <>
                <LoadingBar />
                <div className="absolute inset-0 top-1/2 -translate-y-1/2 px-2 flex justify-center items-center">
                  <p className="text-xl font-semibold tracking-widest bg-clip-text fill-transparent">
                    Loading More
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <ErrorIllustration errorMsg="oops! no recipes to display" />
      )}
    </div>
  );
  // return <div>{status === 'error' ?
  // <ErrorIllustration errorMsg="oops! no recipes to display" />
  // : (
  //   <>
  //   </>

  // )</div>;
};

export default RecipesList;
