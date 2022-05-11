import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ctl from '@netlify/classnames-template-literals';
import ThemeButton from '@components//darkmode';
import NavigationBar from '@components//NavigationBar';
import Recipes from '@pages/Recipes/Recipes';
import LoadingBar from '@components/LoadingBar';
import CardLoading from '@components/CardLoading';
const RecipeForm = lazy(() => import('@pages/Recipes/RecipeForm'));
const RecipeDetail = lazy(() => import('@pages/Recipes/RecipeDetail'));
import Account from '@pages/Accounts/Account';
import watchSession from '@hooks/watchSession';
import Unauthorized from '@pages/Unauthorized/Unauthorized';
import Search from '@pages/Search/Search';

const App = () => {
  watchSession();
  return (
    <div
      className={ctl(
        `p-safe h-screen-safe w-full
        container
        flex flex-grow mx-auto flex-col mb-1 relative
        `
      )}
    >
      <ThemeButton />
      <Routes>
        <Route index element={<Recipes />} />
        <Route path="account">
          <Route index element={<Account />} />
        </Route>
        <Route path="recipes">
          <Route index element={<Recipes />} />
          <Route
            path=":id"
            element={
              <Suspense fallback={<CardLoading rKey="RecipeDetail" />}>
                <RecipeDetail />
              </Suspense>
            }
          />
          <Route
            path=":id/:action"
            element={
              <Suspense fallback={<CardLoading rKey="RecipeDetail" />}>
                <div className='dark:text-slate-100'>place holder for me to add recipe edit</div>
              </Suspense>
            }
          />
          <Route
            path="create"
            element={
              <Suspense fallback={<LoadingBar />}>
                <RecipeForm header="create recipe" />
              </Suspense>
            }
          />
        </Route>
        <Route path="search">
          <Route index element={<Search />} />
        </Route>
        <Route path="unauthorized">
          <Route index element={<Unauthorized />} />
        </Route>
      </Routes>
      <div className="inline-block py-10 w-full" aria-hidden></div>
      <NavigationBar />
    </div>
  );
};

export default App;
