// Secure Authentication with Supabase - Best Practices
// Uses anon key (safe for client), RLS policies enforce security
import { supabase } from './supabase';
import type { User as AuthUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'coach' | 'client';
  hasFullAccess: boolean;
}

// ============================================================================
// AUTHENTICATION FUNCTIONS
// ============================================================================

/**
 * Sign in with email and password
 * Uses Supabase Auth with secure token handling
 */
export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  try {
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error.message);
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: 'No user data returned' };
    }

    // Fetch user profile with RLS protection
    const user = await fetchUserProfile(data.user.id);
    
    if (!user) {
      return { user: null, error: 'Profile not found' };
    }

    return { user, error: null };
  } catch (error) {
    console.error('Unexpected sign in error:', error);
    return { user: null, error: 'An unexpected error occurred' };
  }
}

/**
 * Sign out current user
 * Clears session and tokens securely
 */
export async function signOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

/**
 * Get current authenticated user
 * Checks session validity and returns profile
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    // Get current session (checks token validity)
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }

    // Fetch user profile with RLS
    const user = await fetchUserProfile(session.user.id);
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Listen for auth state changes
 * Handles token refresh, logout, etc.
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed:', event);
    
    if (session?.user) {
      const user = await fetchUserProfile(session.user.id);
      callback(user);
    } else {
      callback(null);
    }
  });
}

// ============================================================================
// PROFILE FUNCTIONS (Protected by RLS)
// ============================================================================

/**
 * Fetch user profile from database
 * Protected by RLS - user can only access their own profile
 */
async function fetchUserProfile(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Fetch profile error:', error.message);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      hasFullAccess: data.has_full_access,
    };
  } catch (error) {
    console.error('Unexpected profile fetch error:', error);
    return null;
  }
}

/**
 * Update user profile
 * Protected by RLS - user can only update their own profile
 */
export async function updateProfile(userId: string, updates: Partial<User>): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Update profile error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected update error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// MAGIC LINK AUTHENTICATION (Passwordless)
// ============================================================================

/**
 * Send magic link for passwordless login
 * More secure than passwords
 */
export async function sendMagicLink(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      console.error('Magic link error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected magic link error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// PASSWORD RESET
// ============================================================================

/**
 * Request password reset email
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error('Password reset error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected password reset error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('Password update error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected password update error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// SECURITY HELPERS
// ============================================================================

/**
 * Check if user has required role
 */
export function hasRole(user: User | null, role: 'admin' | 'coach' | 'client'): boolean {
  return user?.role === role;
}

/**
 * Check if user has full access (Premium)
 */
export function hasFullAccess(user: User | null): boolean {
  return user?.hasFullAccess === true;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: User | null): boolean {
  return user !== null;
}

/**
 * Get user's access level
 */
export function getAccessLevel(user: User | null): 'none' | 'basic' | 'full' | 'admin' {
  if (!user) return 'none';
  if (user.role === 'admin') return 'admin';
  if (user.hasFullAccess) return 'full';
  return 'basic';
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Refresh the current session
 * Called automatically by Supabase, but can be manually triggered
 */
export async function refreshSession(): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Session refresh error:', error.message);
      return false;
    }

    return !!data.session;
  } catch (error) {
    console.error('Unexpected refresh error:', error);
    return false;
  }
}

/**
 * Get session expiry time
 */
export async function getSessionExpiry(): Promise<Date | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return null;
    
    return new Date(session.expires_at! * 1000);
  } catch (error) {
    console.error('Get session expiry error:', error);
    return null;
  }
}

