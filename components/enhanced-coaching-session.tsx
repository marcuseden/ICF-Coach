'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import type { SessionContext } from '@/lib/types';

interface EnhancedCoachingSessionProps {
  mode?: 'ai' | 'human';
  onSessionEnd?: () => void;
}

export function EnhancedCoachingSession({ 
  mode = 'ai', 
  onSessionEnd 
}: EnhancedCoachingSessionProps) {
  const [sessionContext, setSessionContext] = useState<SessionContext | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'focus' | 'session' | 'commitment'>('focus');
  
  // Session data
  const [focusArea, setFocusArea] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [commitment, setCommitment] = useState('');
  const [confidence, setConfidence] = useState([7]);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    startSession();
  }, [mode]);

  const startSession = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/coach/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode })
      });

      if (!response.ok) {
        throw new Error('Failed to start session');
      }

      const result = await response.json();
      setSessionContext(result.context);
      setSessionId(result.session.id);
    } catch (err) {
      console.error('Error starting session:', err);
    } finally {
      setLoading(false);
    }
  };

  const endSession = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      const response = await fetch('/api/coach/end-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          focus_area: focusArea,
          summary: sessionNotes,
          commitment: commitment || null,
          commitment_confidence: commitment ? confidence[0] : null,
          commitment_due_date: dueDate || null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to end session');
      }

      onSessionEnd?.();
    } catch (err) {
      console.error('Error ending session:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !sessionContext) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <p className="text-stone-600">Starting your coaching session...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Coaching Session</h1>
            <p className="text-stone-600 text-sm">
              {mode === 'ai' ? 'AI Coach' : 'Human Coach'} Mode
            </p>
          </div>
          <Badge className="bg-stone-100 text-stone-800 border-stone-200">
            {step === 'focus' ? 'Setting Focus' : 
             step === 'session' ? 'In Session' : 'Creating Commitment'}
          </Badge>
        </div>

        {/* Context Card - Show if there are open commitments */}
        {sessionContext && sessionContext.open_commitments.length > 0 && step === 'focus' && (
          <Card>
            <CardHeader>
              <CardTitle>Your Open Commitments</CardTitle>
              <CardDescription>Review before setting today's focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sessionContext.open_commitments.map((c) => (
                  <div key={c.id} className="p-3 bg-stone-50 rounded-lg">
                    <p className="text-sm text-stone-900">{c.text}</p>
                    {c.confidence && (
                      <p className="text-xs text-stone-600 mt-1">
                        Confidence: {c.confidence}/10
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Set Focus */}
        {step === 'focus' && (
          <Card>
            <CardHeader>
              <CardTitle>What would you like to focus on today?</CardTitle>
              <CardDescription>
                {sessionContext?.suggested_opening_prompt}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the leadership or management topic you'd like to explore..."
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                rows={4}
                className="text-base"
              />
              <Button 
                onClick={() => setStep('session')}
                disabled={!focusArea.trim()}
                className="w-full"
              >
                Begin Session
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Session Notes */}
        {step === 'session' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Session Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-900 font-medium">{focusArea}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ICF Coaching Principles</CardTitle>
                <CardDescription>Keep these in mind during the session</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-stone-700">
                  {sessionContext?.icf_principles.map((principle, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-stone-400">•</span>
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Notes</CardTitle>
                <CardDescription>
                  Capture key insights and learnings from this session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What insights emerged? What became clear? What questions arose?"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  rows={8}
                  className="text-base"
                />
                <Button 
                  onClick={() => setStep('commitment')}
                  className="w-full"
                >
                  Continue to Action Design
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Step 3: Create Commitment */}
        {step === 'commitment' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Design Your Action</CardTitle>
                <CardDescription>
                  What specific action will you commit to?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-900">
                    Commitment (Optional)
                  </label>
                  <Textarea
                    placeholder="I will..."
                    value={commitment}
                    onChange={(e) => setCommitment(e.target.value)}
                    rows={3}
                    className="text-base"
                  />
                </div>

                {commitment && (
                  <>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-stone-900">
                        Confidence Level: {confidence[0]}/10
                      </label>
                      <Slider
                        value={confidence}
                        onValueChange={setConfidence}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-stone-600">
                        How confident are you that you'll complete this action?
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-900">
                        Due Date (Optional)
                      </label>
                      <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="text-base"
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 space-y-3">
                  <Button 
                    onClick={endSession}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Saving...' : 'Complete Session'}
                  </Button>
                  
                  {!commitment && (
                    <p className="text-xs text-stone-600 text-center">
                      You can complete the session without a commitment
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

