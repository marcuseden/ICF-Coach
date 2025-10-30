'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Phone, MapPin } from 'lucide-react';

export default function UpcomingSessionsPage() {
  const router = useRouter();

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: '1',
      type: 'video',
      date: '2025-11-03',
      displayDate: 'Friday, November 3',
      time: '2:00 PM',
      duration: '60 min',
      coach: 'Sarah Johnson',
      focusArea: 'Team motivation strategies',
      status: 'confirmed',
      roomId: 'session-123'
    },
    {
      id: '2',
      type: 'phone',
      date: '2025-11-06',
      displayDate: 'Monday, November 6',
      time: '10:00 AM',
      duration: '45 min',
      coach: 'Sarah Johnson',
      focusArea: 'Leadership development',
      status: 'confirmed',
      phoneNumber: '+1 (555) 123-4567'
    }
  ];

  const joinSession = (session: typeof upcomingSessions[0]) => {
    if (session.type === 'video' && session.roomId) {
      router.push(`/sessions/video/${session.roomId}`);
    } else if (session.type === 'phone' && session.phoneNumber) {
      window.location.href = `tel:${session.phoneNumber}`;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
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
          <h1 className="text-2xl font-bold text-stone-900">Upcoming Sessions</h1>
          <p className="text-stone-600 mt-1">
            Your scheduled coaching sessions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {upcomingSessions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-stone-400" />
              <p className="text-stone-900 font-medium mb-2">No upcoming sessions</p>
              <p className="text-sm text-stone-600 mb-4">
                Book a session with your coach to get started
              </p>
              <Button onClick={() => router.push('/sessions/book')}>
                Book a Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="hover:border-stone-400 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {session.type === 'video' ? (
                          <Video className="h-5 w-5 text-stone-700" />
                        ) : (
                          <Phone className="h-5 w-5 text-stone-700" />
                        )}
                        <CardTitle className="text-lg">
                          {session.type === 'video' ? 'Video Call' : 'Phone Call'}
                        </CardTitle>
                      </div>
                      <CardDescription>with {session.coach}</CardDescription>
                    </div>
                    <Badge className="bg-stone-100 text-stone-900 border-stone-200">
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-stone-600">
                        <Calendar className="h-4 w-4" />
                        <span>Date</span>
                      </div>
                      <p className="text-sm font-medium text-stone-900">
                        {session.displayDate}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-stone-600">
                        <Clock className="h-4 w-4" />
                        <span>Time</span>
                      </div>
                      <p className="text-sm font-medium text-stone-900">
                        {session.time} ({session.duration})
                      </p>
                    </div>
                  </div>

                  {session.focusArea && (
                    <div>
                      <p className="text-sm text-stone-600 mb-1">Focus Area:</p>
                      <p className="text-sm text-stone-900">{session.focusArea}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button 
                      className="flex-1"
                      onClick={() => joinSession(session)}
                    >
                      {session.type === 'video' ? 'Join Video Call' : 'Call Now'}
                    </Button>
                    <Button variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/sessions/book')}
            >
              Book Another Session
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

