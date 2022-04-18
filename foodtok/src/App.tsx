import { Routes, Route } from 'react-router-dom';

import ThemeButton from './components/darkmode';
import NavigationBar from './components/NavigationBar';
import Recipes from './pages/Recipes/Recipes';
import RecipeDetail from './pages/Recipes/RecipeDetail';

const App = () => {
  return (
      <div className="p-safe h-screen-safe w-full h-screen">
        <div className="container sm:max-w-4xl min-h-full flex-grow flex mx-auto flex-col mb-1">
          <ThemeButton />
          <Routes>
            <Route index element={<Recipes />} />
            <Route path="recipes">
              <Route index element={<Recipes />} />
              <Route path=":id" element={<RecipeDetail />} />
            </Route>
          </Routes>
        </div>
        <div className="inline-block py-6" aria-hidden></div>
        <NavigationBar />
      </div>
  );
};

export default App;
