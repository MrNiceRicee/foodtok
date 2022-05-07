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
        <div className="container w-full prose prose-invert text-slate-800 dark:text-slate-200 ">
          <p>sessionToken:</p>
          <pre className="">
            <code>{session.access_token}</code>
          </pre>
          <p>userId: {session?.user?.id}</p>
          <p>
            Keys:
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
