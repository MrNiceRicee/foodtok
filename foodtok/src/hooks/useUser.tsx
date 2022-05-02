import { useRecoilValue } from 'recoil';
import { user } from '@context/Auth';

const useUser = () => useRecoilValue(user);

export default useUser;
