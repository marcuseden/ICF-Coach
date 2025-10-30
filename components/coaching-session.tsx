'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SESSION_FLOW_TEMPLATE, POWERFUL_QUESTIONS } from '@/lib/data';
import { Session } from '@/lib/types';

type SessionStep =
  | 'welcome'
  | 'action-reflection'
  | 'focus'
  | 'explore'
  | 'awareness'
  | 'action'
  | 'outro';

interface CoachingSessionProps {
  session: Partial<Session>;
  clientName: string;
  onComplete: (sessionData: Partial<Session>) => void;
}

export function CoachingSession({ session, clientName, onComplete }: CoachingSessionProps) {
  const [step, setStep] = useState<SessionStep>('welcome');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentResponse, setCurrentResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ type: 'coach' | 'client'; content: string }>
  >([]);

  const stepFlow: SessionStep[] = [
    'welcome',
    'action-reflection',
    'focus',
    'explore',
    'awareness',
    'action',
    'outro',
  ];

  const currentStepIndex = stepFlow.indexOf(step);
  const progress = ((currentStepIndex + 1) / stepFlow.length) * 100;

  const getCoachPrompt = (): string => {
    switch (step) {
      case 'welcome':
        return `Thanks for being here, ${clientName}. How have you been since our last session?`;
      case 'action-reflection':
        return session.previousAction
          ? `You committed to: "${session.previousAction}". What happened? What did you notice?`
          : "Let's start fresh today. What's been on your mind?";
      case 'focus':
        return 'What would you like to focus on today?';
      case 'explore':
        return 'Tell me more about that… What makes this important to you right now?';
      case 'awareness':
        return 'Take a breath… What might this mean for you?';
      case 'action':
        return "What step feels most alive for you now? When will you do it? How will you know you've done it?";
      case 'outro':
        return "Wonderful. I'll check in mid-week with a short prompt. You're doing great work.";
      default:
        return '';
    }
  };

  const handleResponse = () => {
    if (!currentResponse.trim()) return;

    const coachPrompt = getCoachPrompt();
    setConversationHistory((prev) => [
      ...prev,
      { type: 'coach', content: coachPrompt },
      { type: 'client', content: currentResponse },
    ]);
    setResponses((prev) => ({ ...prev, [step]: currentResponse }));
    setCurrentResponse('');

    // Move to next step
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < stepFlow.length) {
      setStep(stepFlow[nextIndex]);
    } else {
      // Session complete
      onComplete({
        ...session,
        focus: responses.focus,
        previousActionReflection: responses['action-reflection'],
        insights: [responses.awareness],
        commitedAction: responses.action,
        notes: Object.values(responses),
        status: 'completed',
      });
    }
  };

  const getPowerfulQuestion = () => {
    const randomIndex = Math.floor(Math.random() * POWERFUL_QUESTIONS.length);
    return POWERFUL_QUESTIONS[randomIndex];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <Badge variant="secondary" className="bg-stone-100 text-stone-700 border-stone-200">
            Session {session.sessionNumber || 1}
          </Badge>
          <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
      </div>

      <Card className="border-stone-200 dark:border-stone-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Coaching Session</CardTitle>
          <CardDescription>Take your time. There's no rush here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {conversationHistory.length === 0 && (
                <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {getCoachPrompt()}
                  </p>
                </div>
              )}

              {conversationHistory.map((entry, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    entry.type === 'coach'
                      ? 'bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800'
                      : 'bg-stone-100 dark:bg-stone-800 ml-8'
                  }`}
                >
                  <p
                    className={`text-sm ${
                      entry.type === 'coach'
                        ? 'font-medium text-stone-900 dark:text-stone-100'
                        : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {entry.content}
                  </p>
                </div>
              ))}

              {conversationHistory.length > 0 && step !== 'outro' && (
                <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {getCoachPrompt()}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {step !== 'outro' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Your response…"
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.metaKey) {
                      handleResponse();
                    }
                  }}
                  className="min-h-[100px] text-base"
                />
                <p className="text-xs text-muted-foreground">
                  Press ⌘+Enter to continue
                </p>
              </div>

              {step === 'explore' && (
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Consider this:
                  </p>
                  <p className="text-sm text-stone-900 dark:text-stone-100">
                    {getPowerfulQuestion()}
                  </p>
                </div>
              )}

              <Button
                onClick={handleResponse}
                disabled={!currentResponse.trim()}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
              >
                Continue
              </Button>
            </div>
          ) : (
            <Button
              onClick={() =>
                onComplete({
                  ...session,
                  status: 'completed',
                })
              }
              className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
            >
              Complete Session
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <CardContent className="pt-4">
          <div className="space-y-2 text-sm">
            <p className="font-medium text-stone-900 dark:text-stone-100">
              ICF Coaching Principles
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Presence: I'm fully here with you</li>
              <li>• Curiosity: Exploring together, not advising</li>
              <li>• Awareness: Helping you discover your own insights</li>
              <li>• Action: Supporting you to move forward</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

