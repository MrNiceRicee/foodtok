import { atom, useRecoilState } from 'recoil';

const userMatch = atom({
  key: 'userMatch',
  default: false,
});

const useUserMatch = () => useRecoilState(userMatch);

export { useUserMatch };
