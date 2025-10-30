'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ElevenLabsCoachAgent, playAudioResponse, startAudioRecording } from '@/lib/elevenlabs-agent';
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react';

interface Message {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

interface VoiceCoachingSessionProps {
  clientName: string;
  sessionNumber: number;
  onComplete: () => void;
}

export function VoiceCoachingSession({
  clientName,
  sessionNumber,
  onComplete,
}: VoiceCoachingSessionProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>();
  
  const agentRef = useRef<ElevenLabsCoachAgent>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    agentRef.current = new ElevenLabsCoachAgent();
    
    return () => {
      if (agentRef.current) {
        agentRef.current.disconnect();
      }
    };
  }, []);

  const startSession = async () => {
    try {
      if (!agentRef.current) return;

      // Start conversation
      const sid = await agentRef.current.startConversation();
      setSessionId(sid);

      // Connect WebSocket
      agentRef.current.connectWebSocket(
        (text, audio) => {
          if (text) {
            setMessages((prev) => [
              ...prev,
              {
                role: 'agent',
                content: text,
                timestamp: new Date(),
              },
            ]);
          }
          if (audio) {
            playAudioResponse(audio);
          }
        },
        (error) => {
          console.error('Agent error:', error);
          alert('Connection error. Please try again.');
        }
      );

      setIsConnected(true);

      // Initial greeting
      setMessages([
        {
          role: 'agent',
          content: `Welcome, ${clientName}. I'm here to support your coaching journey today. This is session ${sessionNumber}. How have you been since we last spoke?`,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Failed to start session:', error);
      alert('Could not connect to coaching agent. Please check your connection.');
    }
  };

  const endSession = () => {
    if (agentRef.current) {
      agentRef.current.disconnect();
    }
    if (mediaRecorderRef.current && isRecording) {
      stopRecording();
    }
    setIsConnected(false);
    onComplete();
  };

  const startRecording = async () => {
    try {
      const recorder = await startAudioRecording();
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const arrayBuffer = await audioBlob.arrayBuffer();
        
        if (agentRef.current) {
          agentRef.current.sendAudio(arrayBuffer);
        }

        // Add user message placeholder
        setMessages((prev) => [
          ...prev,
          {
            role: 'user',
            content: '[Voice message]',
            timestamp: new Date(),
          },
        ]);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone access denied:', error);
      alert('Please allow microphone access to use voice coaching.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-stone-200 dark:border-stone-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Voice Coaching Session</CardTitle>
              <CardDescription>Session {sessionNumber} with {clientName}</CardDescription>
            </div>
            <Badge
              variant="secondary"
              className={
                isConnected
                  ? 'bg-green-100 text-green-700 border-green-200'
                  : 'bg-stone-100 text-stone-700 border-stone-200'
              }
            >
              {isConnected ? '🟢 Live' : '⚪ Offline'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Controls */}
          {!isConnected ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-stone-900 dark:text-stone-100" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to start your voice coaching session?
                </p>
                <Button
                  onClick={startSession}
                  size="lg"
                  className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Start Voice Session
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Conversation History */}
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        message.role === 'agent'
                          ? 'bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800'
                          : 'bg-stone-100 dark:bg-stone-800 ml-8'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === 'agent' && (
                          <Volume2 className="h-3 w-3 text-stone-600 dark:text-stone-400" />
                        )}
                        {message.role === 'user' && (
                          <Mic className="h-3 w-3 text-stone-600 dark:text-stone-400" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {message.role === 'agent' ? 'Coach' : 'You'} •{' '}
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Voice Controls */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                <Button
                  size="lg"
                  variant={isRecording ? 'destructive' : 'default'}
                  className={
                    isRecording
                      ? ''
                      : 'bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900'
                  }
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-5 w-5 mr-2" />
                      Release to Send
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5 mr-2" />
                      Hold to Speak
                    </>
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={endSession}
                  className="border-stone-300 dark:border-stone-700"
                >
                  <PhoneOff className="h-5 w-5 mr-2" />
                  End Session
                </Button>
              </div>

              {sessionId && (
                <p className="text-xs text-center text-muted-foreground">
                  Session ID: {sessionId.slice(0, 8)}...
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* ICF Principles Reminder */}
      <Card className="border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <CardContent className="pt-4">
          <div className="space-y-2 text-sm">
            <p className="font-medium text-stone-900 dark:text-stone-100">
              Voice Coaching Tips
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Speak naturally and take your time</li>
              <li>• The coach will ask powerful questions</li>
              <li>• Reflect before responding - there's no rush</li>
              <li>• Be honest about what comes up for you</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

