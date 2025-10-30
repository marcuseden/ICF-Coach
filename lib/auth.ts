// Authentication for m_lowegrenmac.com full platform access

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'coach' | 'client';
  hasFullAccess: boolean;
}

// Temporary in-memory user store (replace with database in production)
const USERS = new Map<string, { password: string; user: User }>();

// Initialize admin user for m_lowegrenmac.com
USERS.set('m_lowegrenmac.com', {
  password: 'coach2024', // Change this to a secure password
  user: {
    email: 'm_lowegrenmac.com',
    name: 'Mac Lowegren',
    role: 'admin',
    hasFullAccess: true,
  },
});

export async function signIn(email: string, password: string): Promise<User | null> {
  const userData = USERS.get(email);
  
  if (!userData) {
    return null;
  }
  
  if (userData.password === password) {
    return userData.user;
  }
  
  return null;
}

export function signOut(): void {
  // Clear session
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

