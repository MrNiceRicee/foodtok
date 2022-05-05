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
        <div className='break-all'>
          <p>sessionToken:</p>
          <code>{session.access_token}</code>
          <p>userId: {session?.user?.id}</p>
          <p>
            Keys:{' '}
            {Object.keys(session?.user?.user_metadata || {}).map(
              (key) => `${key}: ${session?.user?.user_metadata[key]}`
            )}
          </p>
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
