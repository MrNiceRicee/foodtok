import { atom } from 'recoil';

const darkMode = atom({
  key: 'darkMode',
  default: window.matchMedia('(prefers-color-scheme: dark)').matches,
});

export { darkMode };
