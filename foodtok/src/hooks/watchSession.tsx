import { useEffect } from 'react';
import supabase from '@apis/supabase';
import { user as ctxUser, session as ctxSession } from '@context/Auth';
import { useRecoilState } from 'recoil';

const watchSession = () => {
  const [user, setUser] = useRecoilState(ctxUser);
  const [session, setSession] = useRecoilState(ctxSession);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setSession(session);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, supSession) => {
        setUser(supSession?.user ?? null);
        setSession(supSession);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user, session]);

  return [session, user];
};

export default watchSession;
