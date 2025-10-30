'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mic, MicOff } from 'lucide-react';

interface IPhoneCallUIProps {
  coachName: string;
  coachImage: string;
  coachTitle?: string;
  onEndCall: () => void;
  isConnecting?: boolean;
}

export function IPhoneCallUI({ 
  coachName, 
  coachImage, 
  coachTitle = 'AI Coach',
  onEndCall,
  isConnecting = false
}: IPhoneCallUIProps) {
  const [muted, setMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isConnecting) {
      setIsConnected(true);
    }
  }, [isConnecting]);

  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
    }}>
      {/* Status Bar Spacer */}
      <div className="h-12" />

      {/* Call Status */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        
        {/* Coach Image */}
        <div className="mb-8">
          <div className="relative">
            {/* Animated rings when connecting */}
            {isConnecting && (
              <>
                <div className="absolute inset-0 -m-8 rounded-full border-2 border-white/20 animate-ping" />
                <div className="absolute inset-0 -m-12 rounded-full border-2 border-white/10 animate-ping" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-stone-800">
              <img 
                src={coachImage}
                alt={coachName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Coach Name */}
        <h1 className="text-white text-3xl font-normal mb-2 text-center tracking-tight">
          {coachName}
        </h1>

        {/* Status Text */}
        <p className="text-white/60 text-lg font-light mb-1">
          {isConnecting ? 'ansluter...' : coachTitle}
        </p>

        {/* Call Duration */}
        {isConnected && !isConnecting && (
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-white/80 text-base font-light tracking-wide">
              {formatDuration(callDuration)}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="pb-16 px-6">
        <div className="flex items-center justify-center">
          {/* End Call Button - Centered */}
          <button
            onClick={onEndCall}
            className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-2xl shadow-red-500/50 hover:bg-red-600 transition-colors">
              <Phone className="w-8 h-8 text-white rotate-[135deg]" />
            </div>
            <span className="text-white text-sm font-light tracking-wide">avsluta</span>
          </button>
        </div>
      </div>
    </div>
  );
}

