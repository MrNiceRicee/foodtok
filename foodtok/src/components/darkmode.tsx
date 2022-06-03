import useDarkMode from '@hooks/useDarkMode';
import { useEffect } from 'react';
import Button from './Button';

const ThemeButton = () => {
  const [mode, setMode] = useDarkMode();

  useEffect(() => {
    if (mode) return document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('dark');
  }, [mode]);

  return (
    <div className="prose dark:prose-invert inline-block w-full max-w-sm mx-auto">
      <Button
        onClick={() => setMode(!mode)}
        variance="none"
        className="rounded-lg px-10 py-2 mt-3 hover:shadow-sm w-full"
      >
        {mode ? 'Go light!' : 'Go dark!'}
      </Button>
    </div>
  );
};

export default ThemeButton;
