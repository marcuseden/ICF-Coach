'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-600">Laddar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AppHeader 
        title={`Hej ${user?.name || 'där'}!`}
        subtitle="Välkommen tillbaka"
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-4">
        
        {/* Quick Action Card */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border-stone-200 bg-white"
          onClick={() => router.push('/voice-session')}
        >
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-stone-900 mb-1">Prata med din coach</h3>
                <p className="text-sm text-stone-600">Starta ett röstsamtal med din AI-coach</p>
              </div>
              <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
                <h3 className="font-semibold text-base text-stone-900 mb-3">Kommande sessioner</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                    <span className="text-sm text-stone-700">Nästa session: Tisdag 14:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                    <span className="text-sm text-stone-600">1 bokad session</span>
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
          <h2 className="text-lg font-semibold text-stone-900 mb-3 px-1">Din progress</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-stone-200 bg-white">
              <CardContent className="pt-5 pb-5 text-center">
                <p className="text-3xl font-bold text-stone-900 mb-1">4</p>
                <p className="text-xs text-stone-600">Sessioner</p>
              </CardContent>
            </Card>
            <Card className="border-stone-200 bg-white">
              <CardContent className="pt-5 pb-5 text-center">
                <p className="text-3xl font-bold text-stone-900 mb-1">2</p>
                <p className="text-xs text-stone-600">Aktiva mål</p>
              </CardContent>
            </Card>
            <Card className="border-stone-200 bg-white">
              <CardContent className="pt-5 pb-5 text-center">
                <p className="text-3xl font-bold text-stone-900 mb-1">8.5</p>
                <p className="text-xs text-stone-600">Förtroende</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Today's Focus */}
        <Card className="border-stone-200 bg-white">
          <CardContent className="pt-6 pb-6">
            <h3 className="font-semibold text-base text-stone-900 mb-3">Dagens fokus</h3>
            <p className="text-sm text-stone-700 leading-relaxed mb-4">
              Fortsätt bygga förtroende med ditt team genom individuella samtal. Ta dig tid att verkligen lyssna och ställa öppna frågor.
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
              <span>Visa åtaganden</span>
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
                <h3 className="font-semibold text-base text-stone-900 mb-1">Fortsätt läsa</h3>
                <p className="text-sm text-stone-600">Hantera fjärrteam effektivt</p>
                <p className="text-xs text-stone-500 mt-1">12 min läsning</p>
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
