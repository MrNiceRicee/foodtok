import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    'http://localhost',
  import.meta.env.VITE_SUPABASE_KEY || process.env.VITE_SUPABASE_KEY || '123'
);

export default supabase;
