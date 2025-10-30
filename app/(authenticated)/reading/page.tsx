'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';

export default function ReadingPage() {
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

  const readingMaterials = [
    {
      id: '1',
      title: 'Hantera fjärrteam effektivt',
      description: 'Lär dig strategier för att leda distribuerade team',
      category: 'Ledarskap',
      readTime: '12 min',
      progress: 45,
      image: '/images/reading/reading-1.jpg'
    },
    {
      id: '2',
      title: 'Kraftfulla coachingfrågor',
      description: 'En guide till att ställa frågor som skapar insikt',
      category: 'Coaching',
      readTime: '8 min',
      progress: 0,
      image: '/images/reading/reading-2.jpg'
    },
    {
      id: '3',
      title: 'Bygga psykologisk trygghet',
      description: 'Skapa en miljö där teamet vågar ta risker',
      category: 'Teamutveckling',
      readTime: '15 min',
      progress: 100,
      image: '/images/reading/reading-3.jpg'
    },
    {
      id: '4',
      title: 'Feedback som förändrar',
      description: 'Konsten att ge konstruktiv återkoppling',
      category: 'Kommunikation',
      readTime: '10 min',
      progress: 0,
      image: '/images/reading/reading-4.jpg'
    }
  ];

  const inProgress = readingMaterials.filter(m => m.progress > 0 && m.progress < 100);
  const notStarted = readingMaterials.filter(m => m.progress === 0);
  const completed = readingMaterials.filter(m => m.progress === 100);

  return (
    <div className="min-h-screen bg-stone-50">
      <AppHeader 
        title="Läsmaterial"
        subtitle="Fördjupa dina kunskaper"
        showBack
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
        
        {/* Continue Reading */}
        {inProgress.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-stone-900 mb-3 px-1">Fortsätt läsa</h2>
            <div className="space-y-3">
              {inProgress.map((material) => (
                <Card 
                  key={material.id}
                  className="cursor-pointer hover:shadow-md transition-shadow border-stone-200 bg-white overflow-hidden"
                  onClick={() => router.push(`/reading/${material.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-0">
                      <div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-stone-200 ml-4 my-4 rounded-lg">
                        <img 
                          src={material.image}
                          alt={material.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base text-stone-900 mb-1 line-clamp-2">
                              {material.title}
                            </h3>
                            <p className="text-xs text-stone-600 mb-2">{material.description}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-xs text-stone-600">
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full">
                              {material.category}
                            </span>
                            <span>•</span>
                            <span>{material.readTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-600 rounded-full"
                                style={{ width: `${material.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-purple-600 font-semibold">{material.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recommended */}
        {notStarted.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-stone-900 mb-3 px-1">Rekommenderat</h2>
            <div className="space-y-3">
              {notStarted.map((material) => (
                <Card 
                  key={material.id}
                  className="cursor-pointer hover:shadow-md transition-shadow border-stone-200 bg-white overflow-hidden"
                  onClick={() => router.push(`/reading/${material.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-0">
                      <div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-stone-200 ml-4 my-4 rounded-lg">
                        <img 
                          src={material.image}
                          alt={material.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-base text-stone-900 mb-1 line-clamp-2">
                          {material.title}
                        </h3>
                        <p className="text-xs text-stone-600 mb-3">{material.description}</p>
                        <div className="flex items-center gap-3 text-xs text-stone-600">
                          <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-full">
                            {material.category}
                          </span>
                          <span>•</span>
                          <span>{material.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-stone-900 mb-3 px-1">Genomförda</h2>
            <div className="space-y-3">
              {completed.map((material) => (
                <Card 
                  key={material.id}
                  className="cursor-pointer border-stone-200 bg-white overflow-hidden opacity-75"
                  onClick={() => router.push(`/reading/${material.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-0">
                      <div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-stone-200 relative ml-4 my-4 rounded-lg">
                        <img 
                          src={material.image}
                          alt={material.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-base text-stone-900 mb-1 line-clamp-2">
                          {material.title}
                        </h3>
                        <p className="text-xs text-stone-600 mb-3">{material.description}</p>
                        <div className="flex items-center gap-3 text-xs text-stone-600">
                          <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-full">
                            {material.category}
                          </span>
                          <span>•</span>
                          <span>{material.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <AppFooter />
    </div>
  );
}
