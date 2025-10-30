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
    console.log('Auth: Attempting sign in for:', email);
    
    // Sign in with Supabase
    const { user: authUser } = await signInWithEmail(email, password);
    
    if (!authUser) {
      console.error('Auth: No auth user returned');
      return null;
    }
    
    console.log('Auth: Supabase auth successful, user ID:', authUser.id);

    // Get user profile from database
    const profile = await getUserProfile(authUser.id);
    
    if (!profile) {
      console.error('Auth: No profile found for user:', authUser.id);
      return null;
    }
    
    console.log('Auth: Profile loaded:', profile.email, profile.role);

    const user: User = {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      hasFullAccess: profile.has_full_access,
    };
    
    // Store in localStorage
    setCurrentUser(user);
    console.log('Auth: User stored in localStorage');
    
    return user;
  } catch (error) {
    console.error('Auth: Sign in error:', error);
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
