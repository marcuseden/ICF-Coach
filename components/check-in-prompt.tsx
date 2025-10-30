'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { CheckIn } from '@/lib/types';

interface CheckInPromptProps {
  sessionId: string;
  previousAction?: string;
  onComplete: (checkIn: Omit<CheckIn, 'id' | 'date'>) => void;
}

export function CheckInPrompt({ sessionId, previousAction, onComplete }: CheckInPromptProps) {
  const [rating, setRating] = useState<number>(3);
  const [insight, setInsight] = useState('');

  const handleSubmit = () => {
    if (!insight.trim()) return;

    onComplete({
      sessionId,
      actionRating: rating,
      insight: insight.trim(),
    });
  };

  const getRatingText = (value: number) => {
    if (value === 1) return 'Challenging';
    if (value === 2) return 'Difficult';
    if (value === 3) return 'Okay';
    if (value === 4) return 'Good';
    if (value === 5) return 'Excellent';
    return '';
  };

  return (
    <Card className="border-stone-200 dark:border-stone-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Mid-Week Check-In</CardTitle>
        <CardDescription>
          How did your week's action go? Let's reflect together.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {previousAction && (
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Your commitment:
            </p>
            <p className="text-sm text-stone-900 dark:text-stone-100">{previousAction}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium">How did it go?</label>
            <div className="space-y-4 pt-2">
              <Slider
                min={1}
                max={5}
                step={1}
                value={[rating]}
                onValueChange={(value) => setRating(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">1</span>
                <span className="font-semibold text-base">{getRatingText(rating)}</span>
                <span className="text-muted-foreground">5</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Share one insight</label>
            <Textarea
              placeholder="What did you notice? What surprised you? What did you learn?"
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              className="min-h-[120px] text-base"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!insight.trim()}
            className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
          >
            Submit Check-In
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            {"I'll see you at our next session"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

