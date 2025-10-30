'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface FaceTimeCallProps {
  coachName: string;
  coachImage: string;
  onEndCall: () => void;
}

export function FaceTimeCall({ coachName, coachImage, onEndCall }: FaceTimeCallProps) {
  const [muted, setMuted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-stone-900 z-50 flex flex-col">
      {/* Main Video Area - Coach */}
      <div className="flex-1 relative overflow-hidden">
        <img 
          src={coachImage}
          alt={coachName}
          className="w-full h-full object-cover"
        />
        
        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-stone-900/80 to-transparent">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-1">{coachName}</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="text-white/90 text-sm">{formatDuration(callDuration)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Self View - Small Corner Video */}
        <div className="absolute top-20 right-4 w-24 h-32 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-stone-800">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-700 to-stone-900">
            <div className="w-12 h-12 rounded-full bg-stone-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="safe-area-bottom pb-8 px-6">
        <div className="flex items-center justify-center gap-6">
          {/* Mute Button */}
          <Button
            size="icon"
            variant="ghost"
            className="h-16 w-16 rounded-full bg-stone-700/80 hover:bg-stone-600/80 backdrop-blur-xl"
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <MicOff className="h-7 w-7 text-white" />
            ) : (
              <Mic className="h-7 w-7 text-white" />
            )}
          </Button>

          {/* End Call Button */}
          <Button
            size="icon"
            variant="destructive"
            className="h-20 w-20 rounded-full bg-red-500 hover:bg-red-600 shadow-2xl"
            onClick={onEndCall}
          >
            <Phone className="h-8 w-8 text-white rotate-[135deg]" />
          </Button>

          {/* Video Toggle Button */}
          <Button
            size="icon"
            variant="ghost"
            className="h-16 w-16 rounded-full bg-stone-700/80 hover:bg-stone-600/80 backdrop-blur-xl"
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? (
              <Video className="h-7 w-7 text-white" />
            ) : (
              <VideoOff className="h-7 w-7 text-white" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

