import { Routes, Route } from 'react-router-dom';
import ThemeButton from './components/darkmode';
import NavigationBar from './components/NavigationBar';
import Recipes from './pages/Recipes/Recipes';

const App = () => {
  return (
    <div className="p-safe h-screen-safe w-full h-screen">
      <div className="container sm:max-w-4xl min-h-full flex-grow flex mx-auto flex-col">
        <ThemeButton />
        <Routes>
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </div>
      <div className="inline-block py-4" aria-hidden></div>
      <NavigationBar />
    </div>
  );
};

export default App;
