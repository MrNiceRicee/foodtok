import { useEffect, useState } from 'react';

const ThemeButton = () => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (mode) {
      console.log('DARK MODE!');
      document.documentElement.classList.add('dark');
      return;
    }
    console.log('LIGHT MODE!');
    document.documentElement.classList.remove('dark');
    return;
  }, [mode]);

  return (
    <div className="inline-block w-full max-w-sm mx-auto">
      <button
        onClick={() => setMode(!mode)}
        className="rounded-lg px-10 py-2 bg-indigo-500 hover:shadow-sm hover:bg-indigo-700 dark:bg-red-500 w-full"
      >
        {mode ? 'Go light!' : 'Go dark!'}
      </button>
    </div>
  );
};

export default ThemeButton;
