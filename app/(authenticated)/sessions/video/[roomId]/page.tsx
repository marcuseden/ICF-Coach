'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaceTimeCall } from '@/components/facetime-call';
import { getCurrentUser } from '@/lib/auth';
import { getRandomCoach } from '@/lib/coach-data';

export default function VideoSessionPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;
  const [userName, setUserName] = useState('User');
  const [coach] = useState(() => getRandomCoach());

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
    } else {
      setUserName(user.name || 'User');
    }
  }, [router]);

  const handleEndCall = () => {
    router.push('/dashboard');
  };

  return (
    <FaceTimeCall 
      coachName={coach.name}
      coachImage={coach.image}
      onEndCall={handleEndCall}
    />
  );
}

