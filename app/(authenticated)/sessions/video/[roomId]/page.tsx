'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { VideoCall } from '@/components/video-call';
import { getCurrentUser } from '@/lib/auth';

export default function VideoSessionPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;
  const [userName, setUserName] = useState('User');

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
    <VideoCall 
      roomName={roomId}
      userName={userName}
      onEndCall={handleEndCall}
    />
  );
}

