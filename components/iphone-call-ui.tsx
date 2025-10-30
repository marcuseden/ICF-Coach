'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mic, MicOff } from 'lucide-react';

interface iPhoneCallUIProps {
  coachName: string;
  coachImage: string;
  coachTitle?: string;
  onEndCall: () => void;
  isConnecting?: boolean;
}

export function iPhoneCallUI({ 
  coachName, 
  coachImage, 
  coachTitle = 'AI Coach',
  onEndCall,
  isConnecting = false
}: iPhoneCallUIProps) {
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
      <div className="pb-12 px-6">
        <div className="flex items-center justify-center gap-20">
          
          {/* Mute Button */}
          <button
            onClick={() => setMuted(!muted)}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              muted ? 'bg-white' : 'bg-white/20'
            }`}>
              {muted ? (
                <MicOff className="w-7 h-7 text-stone-900" />
              ) : (
                <Mic className="w-7 h-7 text-white" />
              )}
            </div>
            <span className="text-white text-xs font-light tracking-wide">
              {muted ? 'av' : 'ljud'}
            </span>
          </button>

          {/* End Call Button */}
          <button
            onClick={onEndCall}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-2xl shadow-red-500/50">
              <Phone className="w-7 h-7 text-white rotate-[135deg]" />
            </div>
            <span className="text-white text-xs font-light tracking-wide">avsluta</span>
          </button>

          {/* Spacer for visual balance */}
          <div className="w-16" />
        </div>

        {/* Additional Controls Row (optional) */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform opacity-60">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="text-white text-xs font-light tracking-wide">högtalare</span>
          </button>

          <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform opacity-60">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-white text-xs font-light tracking-wide">lägg till</span>
          </button>

          <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform opacity-60">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-white text-xs font-light tracking-wide">video</span>
          </button>
        </div>
      </div>
    </div>
  );
}

