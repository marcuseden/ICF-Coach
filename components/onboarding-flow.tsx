'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { PackageSelector } from './package-selector';
import { QuestionnaireForm } from './questionnaire-form';
import { PackageType } from '@/lib/types';
import { COACHING_PACKAGES, QUESTIONNAIRES } from '@/lib/data';

type OnboardingStep = 'welcome' | 'package' | 'intake' | 'complete';

export function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<PackageType>();

  const progress = {
    welcome: 25,
    package: 50,
    intake: 75,
    complete: 100,
  };

  const handleWelcome = () => {
    if (clientName.trim()) {
      setStep('package');
    }
  };

  const handlePackageSelect = (packageType: PackageType) => {
    setSelectedPackage(packageType);
  };

  const handlePackageContinue = () => {
    if (selectedPackage) {
      setStep('intake');
    }
  };

  const handleIntakeComplete = (responses: Record<string, string | number>) => {
    console.log('Intake responses:', responses);
    setStep('complete');
  };

  if (step === 'welcome') {
    return (
      <div className="space-y-6">
        <Progress value={progress[step]} className="h-1" />
        <Card className="border-stone-200 dark:border-stone-800">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome to YourCoachAgent
            </CardTitle>
            <CardDescription className="text-base mt-2">
              I'm here to support your growth through professional ICF coaching.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                What's your name?
              </label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleWelcome()}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleWelcome}
                disabled={!clientName.trim() || !clientEmail.trim()}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
              >
                Begin Your Journey
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By continuing, you agree to work together in a coaching partnership
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'package') {
    return (
      <div className="space-y-6">
        <Progress value={progress[step]} className="h-1" />
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">Step 2 of 4</p>
        </div>
        <PackageSelector onSelect={handlePackageSelect} selectedPackage={selectedPackage} />
        {selectedPackage && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep('welcome')}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handlePackageContinue}
              className="flex-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (step === 'intake') {
    return (
      <div className="space-y-6">
        <Progress value={progress[step]} className="h-1" />
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">Step 3 of 4</p>
          <h2 className="text-2xl font-bold tracking-tight">Let's Get to Know You</h2>
          <p className="text-muted-foreground text-balance">
            These questions help me understand where you are and where you want to go.
          </p>
        </div>
        <QuestionnaireForm
          questionnaire={QUESTIONNAIRES.intake}
          onComplete={handleIntakeComplete}
          onBack={() => setStep('package')}
        />
      </div>
    );
  }

  if (step === 'complete') {
    const pkg = selectedPackage ? COACHING_PACKAGES.find((p) => p.id === selectedPackage) : null;

    return (
      <div className="space-y-6">
        <Progress value={progress[step]} className="h-1" />
        <Card className="border-stone-200 dark:border-stone-800">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-stone-900 dark:text-stone-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              You're All Set, {clientName}!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Your coaching journey begins now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {pkg && (
              <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <h3 className="font-semibold mb-2">Your Package: {pkg.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {pkg.sessions} sessions over {pkg.duration}
                </p>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <h4 className="font-semibold">What happens next:</h4>
              <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Review your first reading material</li>
                <li>Schedule your first session</li>
                <li>Prepare what you'd like to focus on</li>
                <li>We'll begin our coaching work together</li>
              </ol>
            </div>

            <div className="pt-4">
              <Button className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900">
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

