import supabase from '@apis/supabase';
import { getUser } from '@apis/user';
import Button from '@components/Button';
import useSession from '@hooks/useSession';
import EditForm from './EditForm';

import AccountLoginRegister from './LoginRegister/AccountLoginRegister';

const Account = () => {
  const session = useSession();
  const sessionUser = session?.user;
  const { data: user, isSuccess } = getUser(sessionUser?.id);

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
              (key) => ` ${key}: ${session?.user?.user_metadata[key]} \n`
            )}
          </p>
          <Button
            type="button"
            className="bg-emerald-500 shadow-slate-500/40 mx-auto w-full"
            onClick={handleLogout}
          >
            <p className="dark:text-slate-50">logout</p>
          </Button>
          {isSuccess && <EditForm user={user} id={sessionUser?.id}/>}
        </div>
      )}
    </>
  );
};

export default Account;
