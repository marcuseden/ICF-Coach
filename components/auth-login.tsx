'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Apple } from 'lucide-react';
import { signIn } from '@/lib/auth';

interface AuthLoginProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function AuthLogin({ onSuccess, redirectTo = '/dashboard' }: AuthLoginProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await signIn(email, password);
      
      if (user) {
        console.log('Login successful, redirecting to:', redirectTo);
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Small delay to ensure localStorage is set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Force a hard navigation to ensure page reload
        window.location.href = redirectTo;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple' | 'azure') => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement actual Supabase OAuth
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider,
      //   options: {
      //     redirectTo: `${window.location.origin}${redirectTo}`
      //   }
      // });

      // Mock for demo
      setTimeout(() => {
        setIsLoading(false);
        if (onSuccess) onSuccess();
        router.push(redirectTo);
      }, 1000);
    } catch (err) {
      setError(`Failed to login with ${provider}`);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-stone-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in to continue your coaching journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* OAuth Providers */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin('apple')}
            disabled={isLoading}
          >
            <Apple className="h-5 w-5 mr-2" />
            Continue with Apple
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin('azure')}
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.4 24H0V12.6L11.4 24zM24 11.4V0L12.6 11.4H24zM0 0v11.4h11.4L0 0zm13.5 12.6L24 24H12.6v-11.4h.9z"/>
            </svg>
            Continue with Microsoft
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-stone-600">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                type="button"
                variant="link"
                className="px-0 text-xs text-stone-600 hover:text-stone-900"
                onClick={() => router.push('/forgot-password')}
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center text-sm text-stone-600">
          Don't have an account?{' '}
          <Button
            variant="link"
            className="px-0 text-stone-900 hover:text-stone-700"
            onClick={() => router.push('/signup')}
          >
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

