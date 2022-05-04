import supabase from '@apis/supabase';
import Button from '@components/Button';
import useSession from '@hooks/useSession';
import useUser from '@hooks/useUser';

import AccountLoginRegister from './landing/AccountLoginRegister';

const Account = () => {
  const session = useSession();
  const account = useUser();
  const handleLogout = () => supabase.auth.signOut();

  console.log(supabase.auth.session());
  console.log('session Account', session);
  console.log('account account', account);
  return (
    <>
      {!session ? (
        <AccountLoginRegister />
      ) : (
        <div>
          <p>{session.access_token}</p>
          <p>{session?.user?.id}</p>
          <Button
            type="button"
            className="bg-emerald-500 shadow-slate-500/40 mx-auto w-full"
            onClick={handleLogout}
          >
            <p className="dark:text-slate-50">logout</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default Account;
