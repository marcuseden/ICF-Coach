'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { IPhoneCallUI } from '@/components/iphone-call-ui';

export default function VoiceSessionPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sessionContext, setSessionContext] = useState<any>(null);

  // AI Coach details
  const aiCoach = {
    name: 'AI Coach',
    title: 'Din personliga coach',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=faces'
  };

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

  const handleEndCall = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
      }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Startar din session...</p>
        </div>
      </div>
    );
  }

  return (
    <IPhoneCallUI
      coachName={aiCoach.name}
      coachImage={aiCoach.image}
      coachTitle={aiCoach.title}
      onEndCall={handleEndCall}
      isConnecting={false}
    />
  );
}

