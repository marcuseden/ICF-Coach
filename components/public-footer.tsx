'use client';

import { useRouter } from 'next/navigation';

export function PublicFooter() {
  const router = useRouter();

  return (
    <footer className="py-12 px-4 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto text-center text-stone-600">
        <p className="mb-4">© 2025 YourCoachAgent. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm">
          <button 
            onClick={() => router.push('/privacy')}
            className="hover:text-stone-900 transition-colors"
          >
            Privacy
          </button>
          <button 
            onClick={() => router.push('/terms')}
            className="hover:text-stone-900 transition-colors"
          >
            Terms
          </button>
          <button 
            onClick={() => router.push('/contact')}
            className="hover:text-stone-900 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}

