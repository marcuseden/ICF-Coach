'use client';

import { useState, useEffect } from 'react';
import { LandingPage } from '@/components/landing-page';
import { LoginForm } from '@/components/login-form';
import { getCurrentUser, signOut, type User } from '@/lib/auth';
import { MobileLayout } from '@/components/mobile-layout';
import { OnboardingFlow } from '@/components/onboarding-flow';
import { CoachingSession } from '@/components/coaching-session';
import { VoiceCoachingSession } from '@/components/voice-coaching-session';
import { CheckInPrompt } from '@/components/check-in-prompt';
import { ReadingList } from '@/components/reading-material';
import { ProgressTracker } from '@/components/progress-tracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Client, Session, CheckIn } from '@/lib/types';
import { COACHING_PACKAGES } from '@/lib/data';
import { MessageCircle, BookOpen, Target, TrendingUp, Mic } from 'lucide-react';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'onboarding' | 'dashboard' | 'session' | 'voice-session' | 'checkin'>(
    'landing'
  );
  const [sessionType, setSessionType] = useState<'text' | 'voice'>('text');
  const [client, setClient] = useState<Client | null>(null);
  const [completedReadings, setCompletedReadings] = useState<string[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUserState(user);
      setIsAuthenticated(true);
    }
  }, []);

  // Mock client for demo purposes (after onboarding)
  const handleOnboardingComplete = () => {
    const mockClient: Client = {
      id: '1',
      name: 'Alex',
      email: 'alex@example.com',
      package: 'standard',
      startDate: new Date(),
      currentSession: 1,
      sessions: [],
      checkIns: [],
      questionnaires: [],
    };
    setClient(mockClient);
    setView('dashboard');
  };

  const handleSessionComplete = (sessionData: Partial<Session>) => {
    if (!client) return;

    const newSession: Session = {
      id: Date.now().toString(),
      sessionNumber: client.currentSession,
      date: new Date(),
      focus: sessionData.focus || '',
      insights: sessionData.insights || [],
      commitedAction: sessionData.commitedAction,
      notes: sessionData.notes || [],
      status: 'completed',
    };

    setClient({
      ...client,
      sessions: [...client.sessions, newSession],
      currentSession: client.currentSession + 1,
    });
    setView('dashboard');
  };

  const handleCheckInComplete = (checkInData: Omit<CheckIn, 'id' | 'date'>) => {
    if (!client) return;

    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      date: new Date(),
      ...checkInData,
    };

    setClient({
      ...client,
      checkIns: [...client.checkIns, newCheckIn],
    });
    setView('dashboard');
  };

  const handleMarkReadingComplete = (materialId: string) => {
    setCompletedReadings([...completedReadings, materialId]);
  };

  const handleLogout = () => {
    signOut();
    setIsAuthenticated(false);
    setCurrentUserState(null);
    setClient(null);
    setView('landing');
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => {
      const user = getCurrentUser();
      setCurrentUserState(user);
      setIsAuthenticated(true);
    }} />;
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('onboarding')} />;
  }

  if (view === 'onboarding') {
    return (
      <MobileLayout showHeader={false}>
        <div className="pt-8">
          <OnboardingFlow />
          {/* Demo button to skip onboarding */}
          <div className="mt-8 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOnboardingComplete}
              className="text-xs text-muted-foreground"
            >
              Skip to Dashboard (Demo)
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (view === 'voice-session' && client) {
    return (
      <MobileLayout clientName={client.name} title="Voice Coaching">
        <VoiceCoachingSession
          clientName={client.name}
          sessionNumber={client.currentSession}
          onComplete={() => {
            handleSessionComplete({});
          }}
        />
      </MobileLayout>
    );
  }

  if (view === 'session' && client) {
    const packageData = COACHING_PACKAGES.find((pkg) => pkg.id === client.package);
    const previousSession = client.sessions[client.sessions.length - 1];

    return (
      <MobileLayout clientName={client.name} title="Coaching Session">
        <CoachingSession
          session={{
            sessionNumber: client.currentSession,
            previousAction: previousSession?.commitedAction,
          }}
          clientName={client.name}
          onComplete={handleSessionComplete}
        />
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => setView('dashboard')}
            className="w-full"
          >
            Back to Dashboard
          </Button>
        </div>
      </MobileLayout>
    );
  }

  if (view === 'checkin' && client) {
    const previousSession = client.sessions[client.sessions.length - 1];

    return (
      <MobileLayout clientName={client.name} title="Check-In">
        <div className="pt-4">
          <CheckInPrompt
            sessionId={previousSession?.id || ''}
            previousAction={previousSession?.commitedAction}
            onComplete={handleCheckInComplete}
          />
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setView('dashboard')}
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (view === 'dashboard' && client) {
    const packageData = COACHING_PACKAGES.find((pkg) => pkg.id === client.package);
    const nextSession = client.currentSession;
    const totalSessions = packageData?.sessions || 0;
    const hasActiveSessions = nextSession <= totalSessions;

    return (
      <MobileLayout clientName={client.name}>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back, {client.name}</h1>
            <p className="text-muted-foreground">
              Ready to continue your journey?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Card
              className="cursor-pointer hover:border-stone-400 dark:hover:border-stone-600 transition-colors border-stone-200 dark:border-stone-800"
              onClick={() => hasActiveSessions && setView('session')}
            >
              <CardContent className="pt-6 pb-4 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-stone-900 dark:text-stone-100" />
                </div>
                <p className="font-semibold text-sm">
                  {hasActiveSessions ? 'Text Session' : 'Completed'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {hasActiveSessions ? 'Written coaching' : 'All done!'}
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-stone-400 dark:hover:border-stone-600 transition-colors border-stone-200 dark:border-stone-800"
              onClick={() => hasActiveSessions && setView('voice-session')}
            >
              <CardContent className="pt-6 pb-4 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mx-auto mb-3">
                  <Mic className="h-6 w-6 text-stone-900 dark:text-stone-100" />
                </div>
                <p className="font-semibold text-sm">
                  {hasActiveSessions ? 'Voice Session' : 'Completed'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {hasActiveSessions ? 'AI voice coach' : 'All done!'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card
            className="cursor-pointer hover:border-stone-400 dark:hover:border-stone-600 transition-colors border-stone-200 dark:border-stone-800"
            onClick={() => client.sessions.length > 0 && setView('checkin')}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-stone-900 dark:text-stone-100" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Check-In</p>
                  <p className="text-xs text-muted-foreground">Mid-week reflection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different views */}
          <Tabs defaultValue="progress" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-stone-100 dark:bg-stone-900">
              <TabsTrigger value="progress" className="data-[state=active]:bg-stone-900 data-[state=active]:text-stone-50 dark:data-[state=active]:bg-stone-100 dark:data-[state=active]:text-stone-900">
                Progress
              </TabsTrigger>
              <TabsTrigger value="reading" className="data-[state=active]:bg-stone-900 data-[state=active]:text-stone-50 dark:data-[state=active]:bg-stone-100 dark:data-[state=active]:text-stone-900">
                Reading
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-stone-900 data-[state=active]:text-stone-50 dark:data-[state=active]:bg-stone-100 dark:data-[state=active]:text-stone-900">
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="space-y-4 mt-4">
              <ProgressTracker client={client} />
            </TabsContent>

            <TabsContent value="reading" className="space-y-4 mt-4">
              {packageData && (
                <ReadingList
                  materials={packageData.readingMaterials}
                  completedMaterials={completedReadings}
                  onMarkComplete={handleMarkReadingComplete}
                />
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-4 mt-4">
              <Card className="border-stone-200 dark:border-stone-800">
                <CardHeader>
                  <CardTitle className="text-xl">Your Insights</CardTitle>
                  <CardDescription>
                    Reflections and learnings from your journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {client.sessions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Your insights will appear here after your first session</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {client.sessions
                        .filter((s) => s.insights && s.insights.length > 0)
                        .map((session) => (
                          <div
                            key={session.id}
                            className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                          >
                            <p className="text-xs text-muted-foreground mb-2">
                              Session {session.sessionNumber} •{' '}
                              {new Date(session.date).toLocaleDateString()}
                            </p>
                            <ul className="space-y-1 text-sm">
                              {session.insights.map((insight, idx) => (
                                <li key={idx}>{insight}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MobileLayout>
    );
  }

  return null;
}
