import { createClient } from '@supabase/supabase-js';

// Safe client-side Supabase configuration with public publishable key
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://hjtxvqgpvcmiktyyanxb.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_KEY ||
  'sb_publishable_dS02G-7A74wCp-NNYYxMrw_grhPsvKj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
