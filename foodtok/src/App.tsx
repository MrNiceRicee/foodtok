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

const App = () => {
  watchSession();
  return (
    <div
      className={ctl(
        `p-safe h-screen-safe w-full
        container sm:max-w-4xl
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
            path="create"
            element={
              <Suspense fallback={<LoadingBar />}>
                <RecipeForm />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <div className="inline-block py-6 w-full" aria-hidden></div>
      <NavigationBar />
    </div>
  );
};

export default App;
