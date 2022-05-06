import { useEffect } from 'react';
import supabase from '@apis/supabase';
import { user as ctxUser, session as ctxSession } from '@context/Auth';
import { useRecoilState } from 'recoil';

const watchSession = () => {
  const [user, setUser] = useRecoilState(ctxUser);
  const [session, setSession] = useRecoilState(ctxSession);

  useEffect(() => {
    const supabaseSession = supabase.auth.session();
    setUser(supabaseSession?.user ?? null);
    setSession(supabaseSession);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, changeSession) => {
        setUser(changeSession?.user ?? null);
        setSession(changeSession);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user, session]);

  return [session, user];
};

export default watchSession;
