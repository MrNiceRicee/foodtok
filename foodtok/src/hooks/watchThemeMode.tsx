import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { darkMode } from '@context/theme';

const watchThemeMode = () => {
  const state = useRecoilValue(darkMode);
  useEffect(() => {
    if (state) return document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('dark');
  }, [state]);
};

export default watchThemeMode;
