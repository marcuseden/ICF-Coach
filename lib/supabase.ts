// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallback for both server and client
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  (typeof window !== 'undefined' ? window.ENV?.NEXT_PUBLIC_SUPABASE_URL : undefined);

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  (typeof window !== 'undefined' ? window.ENV?.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment check:', {
    supabaseUrl: supabaseUrl ? 'present' : 'missing',
    supabaseAnonKey: supabaseAnonKey ? 'present' : 'missing',
    env: process.env.NODE_ENV,
  });
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper to get current user
export async function getCurrentSupabaseUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper to sign in
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Helper to sign out
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Helper to get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data;
}

