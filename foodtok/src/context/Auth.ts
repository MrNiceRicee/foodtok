import { Session, User } from '@supabase/supabase-js';
import { atom } from 'recoil';

type user = User | null;
type session = Session | null;

const user = atom({
  key: 'user',
  default: null as user,
});

const session = atom({
  key: 'session',
  default: null as session,
});

export { user, session };
