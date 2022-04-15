import { Routes, Route } from 'react-router-dom';
import ThemeButton from './components/darkmode';
import NavigationBar from './components/NavigationBar';
import RecipeIndex from './pages/RecipeIndex';

const App = () => {
  return (
    <div className="p-safe h-screen-safe w-full h-screen">
      <ThemeButton />
      <div className="container sm:max-w-4xl p-4 min-h-full flex-grow flex mx-auto">
        <Routes>
          <Route path="/recipes" element={<RecipeIndex />} />
        </Routes>
      </div>
      <div className="inline-block py-4" aria-hidden></div>
      <NavigationBar />
    </div>
  );
};

export default App;
