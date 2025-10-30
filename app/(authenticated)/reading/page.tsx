'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';

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

  // Mock reading materials
  const materials = [
    {
      id: '1',
      title: 'The Leadership Challenge',
      description: 'Essential principles for inspiring action and achieving extraordinary results',
      duration: '15 min read',
      completed: true,
      category: 'Leadership'
    },
    {
      id: '2',
      title: 'Active Listening Techniques',
      description: 'Master the art of truly hearing what your team is saying',
      duration: '10 min read',
      completed: true,
      category: 'Communication'
    },
    {
      id: '3',
      title: 'Managing Remote Teams',
      description: 'Build trust and productivity across distributed teams',
      duration: '12 min read',
      completed: false,
      category: 'Remote Work'
    },
    {
      id: '4',
      title: 'Difficult Conversations Framework',
      description: 'Navigate challenging discussions with confidence and clarity',
      duration: '18 min read',
      completed: false,
      category: 'Communication'
    },
    {
      id: '5',
      title: 'Building Psychological Safety',
      description: 'Create environments where teams thrive and innovate',
      duration: '14 min read',
      completed: false,
      category: 'Culture'
    },
    {
      id: '6',
      title: 'Delegation Mastery',
      description: 'Empower your team while maintaining accountability',
      duration: '11 min read',
      completed: false,
      category: 'Leadership'
    }
  ];

  const completed = materials.filter(m => m.completed);
  const toRead = materials.filter(m => !m.completed);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-14">
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-14 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="mb-2"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-stone-900">Reading Library</h1>
          <p className="text-stone-600 mt-1">
            Curated materials to support your growth
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-stone-900">Your Progress</span>
              <span className="text-sm text-stone-600">{completed.length} of {materials.length} completed</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div 
                className="bg-stone-900 h-2 rounded-full transition-all"
                style={{ width: `${(completed.length / materials.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* To Read */}
        {toRead.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-stone-900 mb-4">To Read</h2>
            <div className="space-y-3">
              {toRead.map((material) => (
                <Card key={material.id} className="hover:border-stone-400 transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-stone-900" />
                      </div>
                      <div className="flex-1">
                        <Badge className="bg-stone-100 text-stone-700 border-stone-200 mb-2">
                          {material.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-stone-900 mb-1">
                          {material.title}
                        </h3>
                        <p className="text-sm text-stone-600 mb-3">
                          {material.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <Clock className="h-3 w-3" />
                          {material.duration}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      Start Reading
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-4">Completed</h2>
            <div className="space-y-3">
              {completed.map((material) => (
                <Card key={material.id} className="bg-stone-50 border-stone-200">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-stone-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-stone-700">
                          {material.title}
                        </h3>
                        <p className="text-xs text-stone-500 mt-1">
                          {material.category} • {material.duration}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

