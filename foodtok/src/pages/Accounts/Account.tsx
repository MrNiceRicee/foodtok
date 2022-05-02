import supabase from '@apis/supabase';
import Button from '@components/Button';
import useSession from '@hooks/useSession';

import AccountLoginRegister from './landing/AccountLoginRegister';

const Account = () => {
  const session = useSession();
  const handleLogout = () => supabase.auth.signOut();

  return (
    <>
      {!session ? (
        <AccountLoginRegister />
      ) : (
        <Button
          type="button"
          className="bg-emerald-500 shadow-slate-500/40 mx-auto w-full"
          onClick={handleLogout}
        >
          <p className="dark:text-slate-50">logout</p>
        </Button>
      )}
    </>
  );
};

export default Account;
