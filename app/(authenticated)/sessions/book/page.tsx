'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { coaches } from '@/lib/coach-data';

export default function BookSessionPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);

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
        title="Boka session"
        subtitle="Välj din coach"
        showBack
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-4">
        
        <div className="space-y-3">
          {coaches.map((coach) => (
            <Card 
              key={coach.id}
              className={`cursor-pointer transition-all border-2 ${
                selectedCoach === coach.id 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
              onClick={() => setSelectedCoach(coach.id)}
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex gap-4">
                  {/* Coach Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-stone-200">
                      <img 
                        src={coach.image} 
                        alt={coach.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Coach Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-stone-900 mb-1">
                      {coach.name}
                    </h3>
                    <p className="text-sm text-stone-600 mb-2">{coach.title}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {coach.specialties.slice(0, 3).map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-stone-100 text-stone-700 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedCoach === coach.id && (
                    <div className="flex-shrink-0 self-start">
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {selectedCoach && (
          <div className="pt-4">
            <button
              onClick={() => router.push(`/sessions/schedule/${selectedCoach}`)}
              className="w-full px-6 py-4 bg-purple-600 text-white rounded-2xl text-base font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              Välj tid för session
            </button>
          </div>
        )}
      </div>

      <AppFooter />
    </div>
  );
}
