import { useRecoilState } from 'recoil';
import { darkMode } from '@context/theme';

const useDarkMode = () => useRecoilState(darkMode);

export default useDarkMode;
