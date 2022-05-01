import { useRecoilValue } from 'recoil';
import { session } from '@context/Auth';

const useSession = () => useRecoilValue(session);

export default useSession;
