import { useEffect, useState } from 'react';
import Button from './Button';

const ThemeButton = () => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (mode) return document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('dark');
  }, [mode]);

  return (
    <div className="prose dark:prose-invert inline-block w-full max-w-sm mx-auto">
      <Button
        onClick={() => setMode(!mode)}
        variance='filled'
        className="rounded-lg px-10 py-2 bg-indigo-500 hover:shadow-sm hover:bg-indigo-700 dark:bg-red-500 w-full text-slate-100 transition-colors duration-500 ease-out"
      >
        {mode ? 'Go light!' : 'Go dark!'}
      </Button>
    </div>
  );
};

export default ThemeButton;
