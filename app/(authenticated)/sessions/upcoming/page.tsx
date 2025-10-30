'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { coaches } from '@/lib/coach-data';

export default function UpcomingSessionsPage() {
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

  const upcomingSessions = [
    {
      id: '1',
      date: '2025-11-05',
      time: '14:00',
      duration: '45 min',
      coach: coaches[0],
      type: 'Video',
      status: 'confirmed'
    },
    {
      id: '2',
      date: '2025-11-12',
      time: '10:00',
      duration: '45 min',
      coach: coaches[1],
      type: 'Video',
      status: 'confirmed'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <AppHeader 
        title="Kommande sessioner"
        showBack
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-4">
        
        {upcomingSessions.map((session) => (
          <Card 
            key={session.id}
            className="cursor-pointer hover:shadow-md transition-shadow border-stone-200 bg-white"
            onClick={() => router.push(`/sessions/video/${session.id}`)}
          >
            <CardContent className="pt-6 pb-6">
              <div className="flex gap-4">
                {/* Date Box */}
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-purple-600">
                      {new Date(session.date).getDate()}
                    </p>
                    <p className="text-xs text-stone-600 uppercase">
                      {new Date(session.date).toLocaleDateString('sv-SE', { month: 'short' })}
                    </p>
                  </div>
                </div>

                {/* Session Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-base text-stone-900">
                        Session med {session.coach.name}
                      </h3>
                      <p className="text-sm text-stone-600">{session.coach.title}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-stone-200">
                      <img 
                        src={session.coach.image} 
                        alt={session.coach.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>{session.type}</span>
                    </div>
                    <span>•</span>
                    <span>{session.duration}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Bekräftad
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {upcomingSessions.length === 0 && (
          <Card className="border-stone-200 bg-white">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-stone-900 mb-2">Inga kommande sessioner</h3>
              <p className="text-sm text-stone-600 mb-6">Boka din nästa session för att fortsätta din utveckling</p>
              <button
                onClick={() => router.push('/sessions/book')}
                className="px-6 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Boka session
              </button>
            </CardContent>
          </Card>
        )}
      </div>

      <AppFooter />
    </div>
  );
}
