import { User } from '@supabase/supabase-js';
import { atom } from 'recoil';

type session = User | null;

const session = atom({
  key: 'session',
  default: null as session,
});

export { session };
