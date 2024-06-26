import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ctl from '@netlify/classnames-template-literals';
import NavigationBar from '@components//NavigationBar';
import Recipes from '@pages/Recipes/Recipes';
import LoadingBar from '@components/LoadingBar';
import CardLoading from '@components/CardLoading';
const RecipeForm = lazy(() => import('@pages/Recipes/RecipeForm'));
const RecipeDetail = lazy(() => import('@pages/Recipes/RecipeDetail'));
const RecipeEdit = lazy(() => import('@pages/Recipes/Edit/RecipeEditForm'));
import Account from '@pages/Accounts/Account';
import watchSession from '@hooks/watchSession';
import Unauthorized from '@pages/Unauthorized/Unauthorized';
import Search from '@pages/Search/Search';
import watchThemeMode from '@hooks/watchThemeMode';

const App = () => {
  watchSession();
  watchThemeMode();

  return (
    <div
      className={ctl(
        `p-safe h-screen-safe w-full min-h-screen-safe
        container
        flex flex-grow mx-auto flex-col mb-1 relative
        `
      )}
    >
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
            path=":id/edit"
            element={
              <Suspense fallback={<CardLoading rKey="RecipeDetail" />}>
                <RecipeEdit />
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
