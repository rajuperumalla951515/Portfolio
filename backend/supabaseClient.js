require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://hjtxvqgpvcmiktyyanxb.supabase.co';
// Support elevated service-role key for backend operations if configured, otherwise fallback to standard key
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  'sb_publishable_dS02G-7A74wCp-NNYYxMrw_grhPsvKj';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
