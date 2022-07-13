import { createClient } from '@supabase/supabase-js';

const supabase = !process.env.PROBE
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY || process.env.VITE_SUPABASE_KEY
    )
  : createClient('', '');

export default supabase;
