'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { VoiceCoachingSession } from '@/components/voice-coaching-session';

export default function VoiceSessionPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sessionContext, setSessionContext] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    
    // Fetch coaching context from add-on API
    fetchCoachingContext();
  }, [router]);

  const fetchCoachingContext = async () => {
    try {
      const response = await fetch('/api/coach/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'ai' })
      });
      
      if (response.ok) {
        const result = await response.json();
        setSessionContext(result.context);
        console.log('Coaching context loaded:', result.context);
      }
    } catch (error) {
      console.error('Failed to load coaching context:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Loading your coaching session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4">
      <div className="max-w-4xl mx-auto">
        <VoiceCoachingSession
          clientName={user?.name || 'User'}
          sessionNumber={1}
          onComplete={() => {
            router.push('/dashboard');
          }}
        />
        
        {/* Show context info for debugging */}
        {sessionContext && sessionContext.open_commitments && sessionContext.open_commitments.length > 0 && (
          <div className="mt-4 p-4 bg-stone-100 rounded-lg border border-stone-200">
            <p className="text-xs font-medium text-stone-900 mb-2">
              Context loaded: {sessionContext.open_commitments.length} active commitment(s)
            </p>
            <p className="text-xs text-stone-600">
              AI coach is aware of your current goals and commitments
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

