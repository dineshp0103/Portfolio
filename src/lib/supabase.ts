import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Only create the client when real credentials are provided
const isConfigured =
    supabaseUrl.startsWith('http') && supabaseAnonKey.length > 10;

export const supabase: SupabaseClient | null = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
