'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { useLanguage } from '@/lib/i18n/language-context';

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log('Dashboard: Checking auth, user:', currentUser);
    
    if (!currentUser) {
      console.log('Dashboard: No user found, redirecting to login');
      // Use window.location for hard redirect
      window.location.href = '/login';
    } else {
      console.log('Dashboard: User authenticated:', currentUser.email);
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-600">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AppHeader 
        title={`${t.dashboard.greeting} ${user?.name || 'där'}!`}
        subtitle={t.dashboard.welcomeBack}
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-4">
        
        {/* Quick Action Card */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border-stone-200 bg-white"
          onClick={() => router.push('/voice-session')}
        >
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center gap-4">
              {/* Round Coach Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-stone-200">
                <img 
                  src="/images/coaches/coach-female-1.jpg"
                  alt="AI Coach"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-stone-900 mb-1">{t.dashboard.quickActions.talkToCoach}</h3>
                <p className="text-sm text-stone-600">{t.dashboard.quickActions.startVoiceCall}</p>
              </div>
              {/* Green Phone Button */}
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-green-600 transition-colors">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border-stone-200 bg-white"
          onClick={() => router.push('/sessions/upcoming')}
        >
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-base text-stone-900 mb-3">{t.dashboard.upcomingSessions}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                    <span className="text-sm text-stone-700">{t.dashboard.nextSession}Tisdag 14:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                    <span className="text-sm text-stone-600">1 {t.dashboard.bookedSessions}</span>
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <div>
          <h2 className="text-lg font-semibold text-stone-900 mb-3 px-1">{t.dashboard.progress.title}</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-stone-200 bg-white">
              <CardContent className="pt-5 pb-5 text-center">
                <p className="text-3xl font-bold text-stone-900 mb-1">4</p>
                <p className="text-xs text-stone-600">{t.dashboard.progress.sessions}</p>
              </CardContent>
            </Card>
            <Card className="border-stone-200 bg-white">
              <CardContent className="pt-5 pb-5 text-center">
                <p className="text-3xl font-bold text-stone-900 mb-1">2</p>
                <p className="text-xs text-stone-600">{t.dashboard.progress.activeGoals}</p>
              </CardContent>
            </Card>
            <Card className="border-stone-200 bg-white">
              <CardContent className="pt-5 pb-5 text-center">
                <p className="text-3xl font-bold text-stone-900 mb-1">8.5</p>
                <p className="text-xs text-stone-600">{t.dashboard.progress.confidence}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Today's Focus */}
        <Card className="border-stone-200 bg-white">
          <CardContent className="pt-6 pb-6">
            <h3 className="font-semibold text-base text-stone-900 mb-3">{t.dashboard.todaysFocus}</h3>
            <p className="text-sm text-stone-700 leading-relaxed mb-4">
              {t.dashboard.todaysFocusText}
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
              <span>{t.dashboard.showCommitments}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Continue Learning */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border-stone-200 bg-white"
          onClick={() => router.push('/reading')}
        >
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base text-stone-900 mb-1">{t.dashboard.continueReading}</h3>
                <p className="text-sm text-stone-600">Hantera fjärrteam effektivt</p>
                <p className="text-xs text-stone-500 mt-1">12 {t.dashboard.minuteRead}</p>
              </div>
              <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </CardContent>
        </Card>

      </div>

      <AppFooter />
    </div>
  );
}
