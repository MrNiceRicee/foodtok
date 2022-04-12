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
    <button
      onClick={() => setMode(!mode)}
      className="rounded-lg bg-indigo-500 hover:shadow-sm hover:bg-indigo-700 dark:bg-red-500"
    >
      Darkmode
    </button>
  );
};

export default ThemeButton;
