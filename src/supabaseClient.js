import { createClient } from '@supabase/supabase-js';

const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : (typeof globalThis !== 'undefined' && globalThis.process?.env) || {};

const supabaseUrl =
  env.VITE_SUPABASE_URL || 'https://hjtxvqgpvcmiktyyanxb.supabase.co';
const supabaseAnonKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.VITE_SUPABASE_KEY ||
  'sb_publishable_dS02G-7A74wCp-NNYYxMrw_grhPsvKj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
