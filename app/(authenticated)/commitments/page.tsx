'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';

export default function CommitmentsPage() {
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

  const commitments = [
    {
      id: '1',
      title: 'Hålla veckovisa 1-on-1 möten',
      description: 'Boka in 30 minuter med varje teammedlem',
      status: 'active',
      progress: 75,
      dueDate: '2025-11-10'
    },
    {
      id: '2',
      title: 'Implementera ny feedback-rutin',
      description: 'Ge konstruktiv feedback minst en gång per vecka',
      status: 'active',
      progress: 40,
      dueDate: '2025-11-15'
    },
    {
      id: '3',
      title: 'Delegera mer ansvar',
      description: 'Identifiera 3 uppgifter att delegera denna månad',
      status: 'completed',
      progress: 100,
      dueDate: '2025-10-31'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <AppHeader 
        title="Dina åtaganden"
        subtitle="Följ upp dina mål"
        showBack
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-4">
        
        {/* Active Commitments */}
        <div>
          <h2 className="text-base font-semibold text-stone-900 mb-3 px-1">Aktiva åtaganden</h2>
          <div className="space-y-3">
            {commitments.filter(c => c.status === 'active').map((commitment) => (
              <Card key={commitment.id} className="border-stone-200 bg-white">
                <CardContent className="pt-5 pb-5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-base text-stone-900 mb-1">
                        {commitment.title}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {commitment.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-600">Progress</span>
                        <span className="text-purple-600 font-semibold">{commitment.progress}%</span>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-600 rounded-full transition-all"
                          style={{ width: `${commitment.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Mål: {new Date(commitment.dueDate).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Commitments */}
        <div>
          <h2 className="text-base font-semibold text-stone-900 mb-3 px-1">Genomförda</h2>
          <div className="space-y-3">
            {commitments.filter(c => c.status === 'completed').map((commitment) => (
              <Card key={commitment.id} className="border-stone-200 bg-white opacity-75">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base text-stone-900 mb-1 line-through">
                        {commitment.title}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {commitment.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add New Button */}
        <button
          className="w-full px-6 py-4 border-2 border-dashed border-stone-300 rounded-2xl text-stone-600 hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center justify-center gap-2 bg-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">Lägg till nytt åtagande</span>
        </button>
      </div>

      <AppFooter />
    </div>
  );
}
