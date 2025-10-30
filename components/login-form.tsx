'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn, setCurrentUser } from '@/lib/auth';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await signIn(email, password);
      
      if (user) {
        setCurrentUser(user);
        onSuccess();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen coach-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-stone-200 dark:border-stone-800">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="h-8 w-8 text-stone-50 dark:text-stone-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to YourCoachAgent</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <p className="text-xs text-center text-muted-foreground">
                Demo credentials:
                <br />
                Email: <code className="text-stone-900 dark:text-stone-100">m_lowegrenmac.com</code>
                <br />
                Password: <code className="text-stone-900 dark:text-stone-100">coach2024</code>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

