require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://hjtxvqgpvcmiktyyanxb.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_dS02G-7A74wCp-NNYYxMrw_grhPsvKj';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
