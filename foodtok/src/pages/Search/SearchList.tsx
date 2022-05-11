import { lazy, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useInView } from 'react-intersection-observer';
import ErrorIllustration from '@components/ErrorIllustration';
import OnError from '@components/onError';
import LoadingBar from '@components/LoadingBar';
import * as React from 'react';
import TextInput from '@components/TextInput';
import { searchQuery } from '@apis/search';
const RecipeCard = lazy(() => import('@pages/Recipes/RecipeCard'));

const RecipesList = () => {
  const [filter, setFilter] = useState('');
  const { ref, inView } = useInView();
  const {
    isError,
    data,
    error,
    isFetching,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = searchQuery({ name: filter });

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [filter]);

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
        <ErrorIllustration errorMsg="oops! failed to search" />
      </OnError>
    );
  }

  return (
    <>
      <TextInput
        title="search"
        variance="outline"
        value={filter}
        onChange={handleFilter}
      />
      {data?.pages && data.pages[0].length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {data.pages.map((page, index) => (
            <React.Fragment key={`${index}`}>
              {page.data.map((item) => (
                <React.Suspense key={`${item._id}`} fallback={<LoadingBar />}>
                  <RecipeCard recipe={item} />
                </React.Suspense>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <figure className="prose dark:text-slate-100">
          <p>{'No Results :('}</p>
        </figure>
      )}
      <button
        className="relative w-full h-20"
        ref={ref}
        type="button"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        {hasNextPage && (
          <>
            <div className="absolute inset-0 top-1/2 -translate-y-1/2 px-2 flex justify-center items-center">
              <p className="text-xl font-semibold tracking-widest text-pink-500">
                more
              </p>
            </div>
          </>
        )}
      </button>
    </>
  );
};

export default RecipesList;
