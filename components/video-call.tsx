'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Phone, Mic, MicOff, Video, VideoOff, MonitorUp, Users } from 'lucide-react';

interface VideoCallProps {
  roomName: string;
  userName: string;
  onEndCall?: () => void;
}

// Jitsi Meet API types
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export function VideoCall({ roomName, userName, onEndCall }: VideoCallProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    // Load Jitsi Meet API
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        initializeJitsi();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => initializeJitsi();
      script.onerror = () => {
        setError('Failed to load video call. Please refresh the page.');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    const initializeJitsi = () => {
      if (!jitsiContainerRef.current) return;

      try {
        const domain = 'meet.jit.si';
        const options = {
          roomName: `YourCoachAgent_${roomName}`,
          width: '100%',
          height: '100%',
          parentNode: jitsiContainerRef.current,
          userInfo: {
            displayName: userName
          },
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'closedcaptions',
              'desktop',
              'fullscreen',
              'fodeviceselection',
              'hangup',
              'chat',
              'recording',
              'livestreaming',
              'etherpad',
              'settings',
              'raisehand',
              'videoquality',
              'filmstrip',
              'stats',
              'shortcuts',
              'tileview',
              'videobackgroundblur',
              'download',
              'help',
              'mute-everyone',
            ],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',
            DEFAULT_BACKGROUND: '#FAFAF9', // stone-50
            DEFAULT_REMOTE_DISPLAY_NAME: 'Coach',
          }
        };

        jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

        // Event listeners
        jitsiApiRef.current.addEventListener('videoConferenceJoined', () => {
          setIsLoading(false);
        });

        jitsiApiRef.current.addEventListener('readyToClose', () => {
          if (onEndCall) onEndCall();
        });

        jitsiApiRef.current.addEventListener('audioMuteStatusChanged', (event: any) => {
          setIsMuted(event.muted);
        });

        jitsiApiRef.current.addEventListener('videoMuteStatusChanged', (event: any) => {
          setIsVideoOff(event.muted);
        });

      } catch (err) {
        console.error('Error initializing Jitsi:', err);
        setError('Failed to start video call. Please try again.');
        setIsLoading(false);
      }
    };

    loadJitsiScript();

    // Cleanup
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [roomName, userName, onEndCall]);

  const toggleAudio = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleAudio');
    }
  };

  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleVideo');
    }
  };

  const endCall = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('hangup');
    }
    if (onEndCall) onEndCall();
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-stone-900 font-medium mb-2">Connection Error</p>
            <p className="text-sm text-stone-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-stone-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900 z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-stone-700 border-t-stone-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-stone-200">Connecting to your coach...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={jitsiContainerRef} 
        className="w-full h-full"
      />
    </div>
  );
}

