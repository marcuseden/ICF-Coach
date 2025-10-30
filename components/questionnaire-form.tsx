'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Questionnaire, Question } from '@/lib/types';

interface QuestionnaireFormProps {
  questionnaire: Questionnaire;
  onComplete: (responses: Record<string, string | number>) => void;
  onBack?: () => void;
}

export function QuestionnaireForm({ questionnaire, onComplete, onBack }: QuestionnaireFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | number>>({});

  const currentQuestion = questionnaire.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionnaire.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questionnaire.questions.length) * 100;

  const handleResponse = (questionId: string, value: string | number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(responses);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const canProceed = responses[currentQuestion.id] !== undefined && responses[currentQuestion.id] !== '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {currentQuestionIndex + 1} of {questionnaire.questions.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>

      <Card className="border-stone-200 dark:border-stone-800">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-balance">
              {currentQuestion.text}
            </h3>

            {currentQuestion.type === 'text' && (
              <Textarea
                placeholder="Take your time… share what comes to mind"
                value={(responses[currentQuestion.id] as string) || ''}
                onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                className="min-h-[120px] text-base"
              />
            )}

            {currentQuestion.type === 'scale' && currentQuestion.scaleRange && (
              <div className="space-y-4 pt-2">
                <Slider
                  min={currentQuestion.scaleRange[0]}
                  max={currentQuestion.scaleRange[1]}
                  step={1}
                  value={[
                    (responses[currentQuestion.id] as number) ||
                      Math.floor(
                        (currentQuestion.scaleRange[0] + currentQuestion.scaleRange[1]) / 2
                      ),
                  ]}
                  onValueChange={(value) => handleResponse(currentQuestion.id, value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{currentQuestion.scaleRange[0]}</span>
                  <span className="font-semibold text-foreground text-base">
                    {responses[currentQuestion.id] ||
                      Math.floor((currentQuestion.scaleRange[0] + currentQuestion.scaleRange[1]) / 2)}
                  </span>
                  <span>{currentQuestion.scaleRange[1]}</span>
                </div>
              </div>
            )}

            {currentQuestion.type === 'multiple' && currentQuestion.options && (
              <div className="space-y-2">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleResponse(currentQuestion.id, option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      responses[currentQuestion.id] === option
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-900'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
            >
              {isLastQuestion ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

