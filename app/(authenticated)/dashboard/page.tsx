'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mic, Target, BookOpen, Calendar, Zap } from 'lucide-react';

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
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Welcome Section */}
      <div className="bg-white border-b border-stone-200 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-stone-900">
            Welcome back, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-stone-600 mt-1">
            Ready to continue your coaching journey?
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-stone-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="cursor-pointer hover:border-stone-400 transition-colors"
              onClick={() => router.push('/voice-session')}
            >
              <CardContent className="pt-6 pb-4 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
                  <Mic className="h-6 w-6 text-stone-900" />
                </div>
                <p className="font-semibold text-sm">Talk to AI Coach</p>
                <p className="text-xs text-stone-600 mt-1">Voice session</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-stone-400 transition-colors"
              onClick={() => router.push('/sessions/book')}
            >
              <CardContent className="pt-6 pb-4 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-stone-900" />
                </div>
                <p className="font-semibold text-sm">Book Human Coach</p>
                <p className="text-xs text-stone-600 mt-1">Video or phone</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions Quick Link */}
          <Card 
            className="cursor-pointer hover:border-stone-400 transition-colors"
            onClick={() => router.push('/sessions/upcoming')}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-stone-900" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Upcoming Sessions</p>
                  <p className="text-xs text-stone-600">2 sessions scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Focus */}
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                <Target className="h-5 w-5 text-stone-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-stone-900 mb-1">Today's Focus</h3>
                <p className="text-sm text-stone-700 mb-3">
                  Continue building trust with your team through 1-on-1 conversations
                </p>
                <Button size="sm" variant="outline" onClick={() => router.push('/commitments')}>
                  View Commitments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Learning */}
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 text-stone-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-stone-900 mb-1">Continue Reading</h3>
                <p className="text-sm text-stone-700 mb-3">
                  Managing Remote Teams • 12 min read
                </p>
                <Button size="sm" variant="outline" onClick={() => router.push('/reading')}>
                  Start Reading
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-stone-900">4</p>
              <p className="text-xs text-stone-600 mt-1">Sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-stone-900">2</p>
              <p className="text-xs text-stone-600 mt-1">Active Goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-stone-900">8.5</p>
              <p className="text-xs text-stone-600 mt-1">Avg Confidence</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

