'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { IPhoneCallUI } from '@/components/iphone-call-ui';
import { ElevenLabsCoachAgent } from '@/lib/elevenlabs-agent';

export default function VoiceSessionPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const agentRef = useRef<ElevenLabsCoachAgent | null>(null);

  // AI Coach details
  const aiCoach = {
    name: 'AI Coach',
    title: 'Din personliga coach',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces'
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    setLoading(false);
    
    // Auto-start ElevenLabs session
    startVoiceSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const startVoiceSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      console.log('🎯 Initializing ElevenLabs voice session...');
      
      // Check if ElevenLabs credentials are configured
      const hasApiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
      const hasAgentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || process.env.ELEVENLABS_AGENT_ID;
      
      if (!hasApiKey || !hasAgentId) {
        throw new Error('ElevenLabs API credentials not configured. Please add NEXT_PUBLIC_ELEVENLABS_API_KEY and NEXT_PUBLIC_ELEVENLABS_AGENT_ID to your .env.local file.');
      }
      
      // Initialize ElevenLabs agent
      agentRef.current = new ElevenLabsCoachAgent();
      console.log('✅ Agent initialized');
      console.log('🌍 Platform:', agentRef.current.getPlatform());
      
      // Start conversation (generates session ID)
      const conversationId = await agentRef.current.startConversation();
      console.log('✅ Conversation ID:', conversationId);
      
      // Connect WebSocket and wait for it to be ready
      await agentRef.current.connectWebSocket(
        (message: string, audio?: ArrayBuffer) => {
          if (message) {
            console.log('📨 Transcript:', message);
          }
          // Audio is played automatically by the agent
        },
        (error: Error) => {
          console.error('❌ WebSocket error:', error);
          setError('Anslutningen förlorades. Försök igen.');
          setIsConnected(false);
        }
      );
      
      console.log('✅ WebSocket connected and ready');
      
      // Start recording from microphone
      await agentRef.current.startRecording();
      console.log('🎤 Microphone active - continuous streaming');
      
      setIsConnected(true);
      setIsConnecting(false);
      console.log('✅ Voice session fully active');
      
    } catch (error: any) {
      console.error('❌ Failed to start voice session:', error);
      setError(error.message || 'Failed to connect to voice coaching');
      setIsConnecting(false);
      setIsConnected(false);
    }
  };

  const handleEndCall = async () => {
    console.log('📞 Ending voice session...');
    
    if (agentRef.current) {
      agentRef.current.disconnect();
      agentRef.current = null;
    }
    
    setIsConnected(false);
    router.push('/dashboard');
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (agentRef.current) {
        console.log('🧹 Cleaning up voice session...');
        agentRef.current.disconnect();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
      }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Laddar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
      }}>
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-white text-lg mb-2">Kunde inte starta sessionen</p>
          <p className="text-white/60 text-sm mb-6">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            Tillbaka till Dashboard
          </button>
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
      isConnecting={isConnecting}
    />
  );
}

