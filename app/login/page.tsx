'use client';

import { AuthLogin } from '@/components/auth-login';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <AuthLogin />
    </div>
  );
}

