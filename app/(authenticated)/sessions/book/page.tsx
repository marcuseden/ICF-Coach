'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, User } from 'lucide-react';

export default function BookSessionPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState('');
  const [sessionType, setSessionType] = useState<'video' | 'phone'>('video');

  // Mock available slots
  const availableSlots = [
    {
      date: '2025-11-02',
      displayDate: 'Thursday, November 2',
      times: ['10:00 AM', '2:00 PM', '4:00 PM']
    },
    {
      date: '2025-11-03',
      displayDate: 'Friday, November 3',
      times: ['9:00 AM', '11:00 AM', '2:00 PM', '3:00 PM']
    },
    {
      date: '2025-11-06',
      displayDate: 'Monday, November 6',
      times: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
    }
  ];

  const coach = {
    name: 'Sarah Johnson',
    title: 'ICF Certified Professional Coach',
    specialties: ['Leadership', 'Career Transitions', 'Team Management'],
    experience: '15+ years',
    sessions: '1,200+ sessions'
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    // TODO: Save booking to database
    // const { data, error } = await supabase
    //   .from('bookings')
    //   .insert({
    //     user_id: user.id,
    //     coach_id: coach.id,
    //     date: selectedDate,
    //     time: selectedTime,
    //     type: sessionType,
    //     focus_area: focusArea
    //   });

    // Mock success
    alert(`Session booked! ${sessionType === 'video' ? 'Video' : 'Phone'} call on ${selectedDate} at ${selectedTime}`);
    router.push('/dashboard');
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
          <h1 className="text-2xl font-bold text-stone-900">Book Human Coach Session</h1>
          <p className="text-stone-600 mt-1">
            Schedule a 1-on-1 session with your coach
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        
        {/* Coach Info */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center">
                <User className="h-8 w-8 text-stone-600" />
              </div>
              <div className="flex-1">
                <CardTitle>{coach.name}</CardTitle>
                <CardDescription>{coach.title}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-stone-100 text-stone-800 border-stone-200">
                    {coach.experience}
                  </Badge>
                  <Badge className="bg-stone-100 text-stone-800 border-stone-200">
                    {coach.sessions}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-700 mb-2">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {coach.specialties.map((specialty) => (
                <Badge 
                  key={specialty}
                  className="bg-stone-50 text-stone-900 border-stone-200"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Session Type */}
        <Card>
          <CardHeader>
            <CardTitle>Session Type</CardTitle>
            <CardDescription>Choose how you'd like to connect</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant={sessionType === 'video' ? 'default' : 'outline'}
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => setSessionType('video')}
            >
              <Video className="h-6 w-6" />
              <span>Video Call</span>
            </Button>
            <Button
              variant={sessionType === 'phone' ? 'default' : 'outline'}
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => setSessionType('phone')}
            >
              <Clock className="h-6 w-6" />
              <span>Phone Call</span>
            </Button>
          </CardContent>
        </Card>

        {/* Select Date & Time */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
            <CardDescription>Choose your preferred time slot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableSlots.map((slot) => (
              <div key={slot.date} className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-stone-900">
                  <Calendar className="h-4 w-4" />
                  {slot.displayDate}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {slot.times.map((time) => {
                    const isSelected = selectedDate === slot.date && selectedTime === time;
                    return (
                      <Button
                        key={time}
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedDate(slot.date);
                          setSelectedTime(time);
                        }}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Focus Area (Optional) */}
        <Card>
          <CardHeader>
            <CardTitle>Focus Area (Optional)</CardTitle>
            <CardDescription>
              What would you like to work on in this session?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Team motivation, difficult conversation with employee, career direction..."
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              rows={4}
              className="text-base"
            />
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <Card className="bg-stone-100 border-stone-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-stone-900 mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Coach:</span>
                  <span className="text-stone-900 font-medium">{coach.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Type:</span>
                  <span className="text-stone-900 font-medium">
                    {sessionType === 'video' ? 'Video Call' : 'Phone Call'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Date:</span>
                  <span className="text-stone-900 font-medium">
                    {availableSlots.find(s => s.date === selectedDate)?.displayDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Time:</span>
                  <span className="text-stone-900 font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Duration:</span>
                  <span className="text-stone-900 font-medium">60 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirm Button */}
        <Button 
          className="w-full" 
          size="lg"
          disabled={!selectedDate || !selectedTime}
          onClick={handleBooking}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}

