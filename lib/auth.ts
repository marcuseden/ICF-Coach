// Authentication with Supabase
import { signInWithEmail, signOutUser, getUserProfile } from './supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'coach' | 'client';
  hasFullAccess: boolean;
}

export async function signIn(email: string, password: string): Promise<User | null> {
  try {
    // Sign in with Supabase
    const { user: authUser } = await signInWithEmail(email, password);
    
    if (!authUser) {
      return null;
    }

    // Get user profile from database
    const profile = await getUserProfile(authUser.id);
    
    if (!profile) {
      return null;
    }

    const user: User = {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      hasFullAccess: profile.has_full_access,
    };
    
    // Store in localStorage
    setCurrentUser(user);
    
    return user;
  } catch (error) {
    console.error('Sign in error:', error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  try {
    await signOutUser();
  } catch (error) {
    console.error('Sign out error:', error);
  }
  
  // Clear local storage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) {
    return null;
  }
  
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

export function hasFullAccess(user: User | null): boolean {
  return user?.hasFullAccess === true;
}
