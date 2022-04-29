import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ctl from '@netlify/classnames-template-literals';
import ThemeButton from '@components//darkmode';
import NavigationBar from '@components//NavigationBar';
import Recipes from '@pages/Recipes/Recipes';
import RecipeDetail from '@pages/Recipes/RecipeDetail';
import LoadingBar from '@components/LoadingBar';
// import RecipeForm from '@pages/Recipes/RecipeForm';
const RecipeForm = lazy(() => import('@pages/Recipes/RecipeForm'));

const App = () => {
  return (
    <div
      className={ctl(
        `p-safe h-screen-safe w-full
        overflow-y-scroll
        container sm:max-w-4xl
        flex flex-grow mx-auto flex-col mb-1 relative
        `
      )}
    >
      <ThemeButton />
      <Routes>
        <Route index element={<Recipes />} />
        <Route path="recipes">
          <Route index element={<Recipes />} />
          <Route path=":id" element={<RecipeDetail />} />
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
