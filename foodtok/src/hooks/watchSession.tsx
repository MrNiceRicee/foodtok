import { useEffect } from 'react';
import supabase from '@apis/supabase';
import { session as ctxSession } from '@context/Auth';
import { useRecoilState } from 'recoil';

const watchSession = () => {
  const [session, setSession] = useRecoilState(ctxSession);

  useEffect(() => {
    const supSession = supabase.auth.session();
    setSession(supSession?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, supSession) => {
        const currentUser = supSession?.user;
        setSession(currentUser ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [session]);

  return session;
};

export default watchSession;
