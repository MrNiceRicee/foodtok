import useSession from '@hooks/useSession';
import { useEffect } from 'react';
import AccountLoginRegister from './landing/AccountLoginRegister';

const Account = () => {
  const session = useSession();

  useEffect(() => console.log('session', session), [session]);
  return <AccountLoginRegister />;
};

export default Account;
