import { Session, User } from '@supabase/supabase-js';
import { atom } from 'recoil';

type UserType = User | null;
type SessionType = Session | null;

const user = atom({
  key: 'user',
  default: null as UserType,
});

const session = atom({
  key: 'session',
  default: null as SessionType,
});

export { user, session };
